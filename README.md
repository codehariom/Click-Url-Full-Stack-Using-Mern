
# Click-url 
### Shorten Your First Link Now – It’s Free! Start Shortening, Tracking, and Optimizing Links Instantly

**Click-url** is a JavaScript-based web application that allows users to shorten long URLs into compact 5-character short links. Built using a modern tech stack, this project provides a responsive front-end and a secure, scalable back-end.

## Live Url 
My project is Live [Live Url] (https://clickurl-r72u.onrender.com/)

## 🚀 Features

- 🔗 Convert long URLs into short, shareable links (5-character shortId)
- 🔐 User authentication and authorization
- ☁️ Image upload integration with Cloudinary
- 📊 URL tracking and analytics (future scope)
- ⚡️ Real-time API responses with validation
- 🧠 Form handling and validation with Formik & Yup
- 📦 RESTful backend with MongoDB and Redis caching

---

## 🧰 Tech Stack

### Frontend

Built using React and styled with Tailwind CSS.

- `@tailwindcss/vite`: ^4.1.5
- `axios`: ^1.9.0
- `formik`: ^2.4.6
- `react`: ^19.1.0
- `react-dom`: ^19.0.0
- `react-icons`: ^5.5.0
- `react-router`: ^7.5.3
- `react-router-dom`: ^7.5.3
- `tailwindcss`: ^4.1.5
- `yup`: ^1.6.1

### Backend

Powered by Express, MongoDB, and Redis.

- `axios`: ^1.9.0
- `bcrypt`: ^5.1.1
- `cloudinary`: ^2.6.1
- `cors`: ^2.8.5
- `dotenv`: ^16.5.0
- `express`: ^5.1.0
- `express-async-handler`: ^1.2.0
- `googleapi`: ^1.0.2
- `googleapis`: ^148.0.0
- `jsonwebtoken`: ^9.0.2
- `mongodb`: ^6.16.0
- `mongoose`: ^8.14.1
- `multer`: ^1.4.5-lts.2
- `nanoid`: ^5.1.5
- `nodemon`: ^3.1.10
- `prettier`: ^3.5.3
- `redis`: ^5.0.1

---

## 📁 Project Structure

```
click-url/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── App.js
├── .env
├── README.md
└── package.json
```

---


### Prerequisites

- Node.js v18+
- Javascript
- MongoDB
- Redis
- Cloudinary account for image hosting

### Environment Variables

Create a `.env` file in the root of the backend and define:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧪 Run Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start
```

---

## 📦 API Endpoints

## User
###  Registration `http://localhost:8000/api/user/register`
### Login `http://localhost:8000/api/user/register`
### Logout `http://localhost:8000/api/user/logout`
### Get all Data `http://localhost:8000/api/user/profile`

## Picure  
### Photo Upload `http://localhost:8000/pic/upload`
### Fetch the picture `http://localhost:8000/pic/upload`

## Profile
### Update Profile details `http://localhost:8000/api/update/profile`

## Url
### New Short url `http://localhost:8000/shorten`

### Get short url `http://localhost:8000/short_code`

### Get all Link `http://localhost:8000/api/links`

### Delete Url `http://localhost:8000/delete-url/short_code`

---

## 📄 License

This project is licensed under the MIT [License](https://github.com/codehariom/Click-Url-Full-Stack-Using-Mern/blob/4d25d908db22d607d19a83dd705c44c6e11f6e93/LICENSE)

---

## 👨‍💻 Author

## Made with ❤️ by [Hariom Gupta]
Follow for more on  [Linkedin](https://www.linkedin.com/in/realhariom/)<br>
Follow on github for more  Project Details [Github](https://github.com/codehariom/)

---
