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

---


