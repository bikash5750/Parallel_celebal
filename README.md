# 🧠 Collaborative Code Editor Backend

A Node.js + Express-based backend for a **real-time collaborative code editor**. This backend enables users to:
- Register/login securely
- Create and join collaborative coding sessions
- Store and retrieve multiple versions of code in real time
- Chat with other collaborators inside a session

Perfect for collaborative interviews, pair programming, or teaching environments.

---

## 🌐 Live Use Case

- A user creates a session.
- They invite others to join via a session ID.
- Multiple users can contribute code together — every change gets versioned.
- A chat interface allows real-time messaging per session.
- Backend supports cookie-based JWT authentication.

---

## 🚀 Features

✅ User Registration & Login  
✅ Password Validation (with Zod)  
✅ JWT-based Auth with Refresh Tokens  
✅ Create & Join Coding Sessions  
✅ Code Versioning System  
✅ Real-time Session-based Chat  
✅ MongoDB Atlas for persistence  
✅ REST APIs for session & message management

---

## 🔧 Tech Stack

| Technology | Description                        |
|------------|------------------------------------|
| Node.js    | JavaScript runtime                 |
| Express.js | Web framework                      |
| MongoDB    | NoSQL database                     |
| Mongoose   | MongoDB ODM                        |
| JWT        | Authentication                     |
| Zod        | Input validation                   |
| Cloudinary | Image upload (avatars)             |
| Cookie     | Secure auth token storage          |

🔌 WebSocket Events (Socket.io)
Event Name	Payload	Description
join-session	sessionId	Join editing room
code-change	{ sessionId, code }	Broadcast code changes
receive-code	code	Receive code update
send-message	{ sessionId, message, sender }	Send chat message
receive-message	{ message, sender, timestamp }	Receive chat message
typing	{ sessionId, userId }	Typing indicator
stop-typing	{ sessionId, userId }	Stop typing indicator

📡 REST API Endpoints
👤 User (/user)
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	Login user
POST	/logout	Logout user

💬 Chat (/chat)
Method	Endpoint	Description
POST	/send	Save chat message
GET	/:sessionId	Fetch all chat messages

💻 Code Versioning (/code)
Method	Endpoint	Description
GET	/:sessionId/latest	Get latest code version
GET	/:sessionId/versions	Get all code versions
POST	/:sessionId/save	Save new code version

.ENV FILE
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000



