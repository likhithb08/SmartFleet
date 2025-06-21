# 🚚 SmartFleet: Real-Time Fleet Optimization Platform

SmartFleet is a real-time fleet tracking and optimization system that uses a modern microservices architecture, event-driven design, and real-time data processing to enhance transportation efficiency. It supports anomaly detection, live tracking, and route performance analytics.

---

## 🌟 Features

* 🔁 Real-time GPS data ingestion using Kafka
* 🧠 Intelligent anomaly detection with clustering and cycle detection
* 📊 Route statistics and analytics dashboard
* 🗺️ Live vehicle tracking with Leaflet.js/Google Maps
* 💡 Modular microservices architecture
* ⚡ Redis caching for performance boost
* 🔌 WebSocket updates for real-time communication
* 🧪 Comprehensive testing with Jest & Supertest
* 📦 JavaScript SDK for easy integration

---

## 🛠 Tech Stack

**Backend**: Node.js, Express.js
**Database**: MongoDB, Redis
**Queue**: Kafka (Kafkajs)
**Frontend**: React.js, TailwindCSS / Material-UI
**Maps**: Leaflet.js / Google Maps API
**Real-time**: Socket.io
**Containerization**: Docker + Docker Compose
**CI/CD**: GitHub Actions
**Monitoring**: Prometheus + Grafana (optional)

---

## 🧱 Project Structure

```
SmartFleet/
├── docker-compose.yml
├── services/
│   ├── ingestion-service/         # ✅ GPS data ingestion
│   ├── anomaly-detection-service/ # ⛔ Under development
│   ├── api-gateway/               # ⛔ Under development
│   ├── websocket-service/         # ⛔ Under development
│   └── data-simulator/           # ⛔ Under development
├── packages/
│   └── smartfleet-sdk/           # ⛔ SDK
├── frontend/                     # ⛔ React dashboard
├── infrastructure/
│   ├── docker/
│   ├── k8s/
│   └── terraform/
└── docs/
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* Docker + Docker Compose
* MongoDB & Redis (local or Docker)

### Installation

```bash
git clone https://github.com/your-username/smartfleet.git
cd smartfleet
npm run install:all
```

### Run Development Servers

```bash
docker-compose -f docker-compose.dev.yml up -d
npm run dev
```

### Run Tests

```bash
npm run test:all
```

---

## 🧪 Example Kafka Message

```json
{
  "DriverId": "D1",
  "lat": "37.7749",
  "lon": "-122.4194",
  "ts": 1750414834701
}
```

---

## 📊 Key Metrics to Track

* ⏱ GPS Points Processed/sec
* 🧠 Anomaly Detection Accuracy
* ⚡ API Response Times
* 📦 Cache Hit Ratio
* 📡 Real-time Update Latency

---

## 🔒 Security

* 🔐 JWT Auth & OAuth2 support
* 📉 Rate limiting & input validation
* 🔒 TLS encryption

---

## 📄 Documentation

* Architecture: `/docs/architecture.md`
* API Docs: `/docs/api-docs.md`
* Deployment: `/docs/deployment.md`

---

## 🙌 Contribution

We welcome contributions! Fork the repo, make your changes, and open a pull request 🚀

---

## 📃 License

MIT License © Likhith B

---

## 🤝 Connect

📧 Email: [likhithb285@gmail.com](mailto:likhithb285@gmail.com)
🌐 Portfolio: [likhithb.vercel.app](https://likhithb.vercel.app)
🐙 GitHub: [@likhithb08](https://github.com/likhithb08)
🔗 LinkedIn: [@likhithb](https://linkedin.com/in/ikhith-b-1a7364242)

---

> "Optimizing fleets, one byte at a time."
