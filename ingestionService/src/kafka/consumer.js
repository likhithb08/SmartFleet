import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import connectDB from "../dataBase/mongo.js";
import GPSData from "../models/GPSData.js";
import isValidGPSData from "../validation/validateGPSData.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({path : path.resolve(__dirname, '../../.env')});

const kafka = new Kafka({
  clientID: "gps-consumer",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "gps-group" });

const runConsumer = async () => {
  await connectDB();
  console.log("MongoDB connected succesfuly");

  await consumer.connect();
  console.log("Kafka consumer connected succesfully");

  await consumer.subscribe({ topic: "gps-data", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("Message recieved : ", data);

      const sanitized = {
        driverId: message.DriverId || message.driverId,
        lat: message.lat,
        lon: message.lon,
        ts: message.ts,
      };

      const { valid, error } = isValidGPSData(data);
      if (!valid) {
        console.error("Invalid GPS Data", message);
        return;
      }

      const gpsEntry = new GPSData({
        DriverId: data.DriverId,
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        ts: new Date(data.ts),
      });
      await gpsEntry.save();
      console.log("Valiid GPS Data saved to MongoDb", gpsEntry);
    },
  });
};

runConsumer().catch(console.error);
