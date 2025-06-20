import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
    clientId: 'gps-ingestor',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    retry: {
        initialRetryTime: 100,
        retries: 8
    },
    connectionTimeout: 30000,
    requestTimeout: 30000
});

const producer = kafka.producer();

async function run() {
    try {
        console.log('Connecting to Kafka...');
        await producer.connect();
        console.log('Connected to Kafka successfully');

        const gpsData = {
            DriverId: 'D1',
            lat: '37.7749',
            lon: '-122.4194',
            ts: Date.now()
        };

        await producer.send({
            topic: 'gps-data',
            messages: [{ value: JSON.stringify(gpsData) }]
        });

        console.log("GPS data sent to Kafka topic 'gps-data'");
        console.log('Data:', gpsData);
        
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await producer.disconnect();
        console.log('Disconnected from Kafka');
    }
}

// Add graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await producer.disconnect();
    process.exit(0);
});

run().catch(console.error);