#  Plack - Real-Time Chat Application

A lightweight team communication platform inspired by **Slack**, built with **Node.js, typescript, Express, MongoDB, JWT Authentication, and Socket.io** for real-time messaging.  
Users can authenticate, join channels, send messages, and chat with others instantly.

---

## 🚀 Features

- **Secure Authentication (JWT)**
- **Real-Time Messaging (Socket.io)**
- **Channel-Based Chat System**
- **Chat History Stored in MongoDB**
- **Tested API using Postman**
- **Clean UI with responsive design**

---

## 🏗 Architecture Diagram

![Slack Architecture](./slack_architecture.png)

--- 

## 🧰 Tech Stack

| Category | Technology |
|---------|------------|
| Backend | Node.js, Express.js , Typescript|
| Database | MongoDB + Mongoose |
| Auth | JSON Web Token (JWT) |
| Real-Time | Socket.io |
| Testing | Postman |
| Client | Typescript and React |

---

## 🔧 Setup Instructions

### 1️⃣ Clone the repo

```sh
git clone https://github.com/sam-kash/Plack.git
cd Plack

```

2️⃣ Install backend dependencies
```
cd back
npm install 

```
3️⃣ Create .env in the back directory
```sh
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

4️⃣ Start the server

```sh
npm run dev
```
5️⃣ Start the frontend
```
cd front
npm install
npm start 
```



