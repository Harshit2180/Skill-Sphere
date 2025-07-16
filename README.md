# 🎓 Skill Sphere - Learning Management System (LMS)

**Skill Sphere** is a full-featured Learning Management System (LMS) that allows instructors to create and manage courses, while students can browse, purchase, and track their learning progress. It includes secure authentication, video lectures, real-time dashboard insights, and Stripe-powered payments, built with the MERN stack.

> 🚀 Live Demo: [https://skillsphereprivate.onrender.com](https://skillsphereprivate.onrender.com)

---

## ✨ Features

### 👤 Authentication
- Secure login/signup using **JWT**
- Role-based access: **Student** and **Instructor**

### 📚 Student Functionality
- Browse and search for available courses
- Preview free lectures
- Purchase courses using **Stripe**
- Track course completion status

### 🧑‍🏫 Instructor/Admin Functionality
- Create new courses with:
  - Title, description, price, level, category, and thumbnail
- Add lectures to courses:
  - Upload videos
  - Mark lectures as free or paid
- View real-time stats on:
  - Courses sold
  - Revenue generated
  - Graphical dashboard (charts)

### 💳 Payment Integration
- Secure checkout via **Stripe**
- Students pay once to unlock each course individually.

---

## 🛠 Tech Stack

- **Frontend**: React, Redux Toolkit, RTK Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe Integration
- **State Management**: Redux Toolkit + RTK Query
- **Deployment**: Render (Full Stack)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Harshit2180/Skill-Sphere.git
cd skill-Sphere

```

### Backend Setup
```bash
cd Backend
npm install
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```
### 🔐 Environment Variables

Create a `.env` file in the **Backend** directory and add the following variables:

```env
MONGO_URI = your_mongodb_connection_string
SECRET_KEY = your_jwt_secret
PORT = 8000

CLOUD_NAME = your_cloudinary_cloud_name
API_KEY = your_cloudinary_api_key
API_SECRET = your_cloudinary_api_secret

STRIPE_SECRET_KEY = your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY = your_stripe_publishable_key
WEBHOOK_ENDPOINT_SECRET = your_stripe_webhook_secret
```
## 🐞 Known Issues / Limitations

- 🔄 **Course description is not updating** when edited by the instructor.
- 🔍 **Search by category** functionality is currently not working as expected.
- ✅ The **"Mark as Completed"** feature lacks toggle functionality; it only supports marking a course as completed, not reverting it.

> These issues are known and will be resolved in upcoming updates. Feel free to contribute or raise an issue in the repository!


## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.
