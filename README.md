# MedStore – Modern Medical E-commerce Platform

MedStore is a full-stack e-commerce application designed to deliver a fast, secure, and seamless shopping experience for medical products. Built with scalable technologies and industry best practices, it delivers optimal performance, accessibility, and maintainability.

---

## ✅ Key Features

- ⚡ **High Performance** – Built using **Next.js** with server-side rendering (SSR) and static site generation (SSG) for blazing-fast load times
- 🔐 **User Authentication** – Secure authentication using **Firebase Auth** and support for third-party providers
- 🛠️ **Admin Dashboard** – Full management of products, orders, and users from a protected admin panel
- 🚚 **Real-time Order Tracking** – Users can track their order status any time
- 🔎 **Advanced Search & Filtering** – Category, keyword and price filtering for improved discoverability

---

## 🧰 Tech Stack

| Layer | Technologies |
|------|--------------|
| Backend | **Express.js** (TypeScript) |
| Database | **MongoDB** + **Mongoose** |
| Environment | Managed with **dotenv** |
| Error Handling | Global error handler module |

---

## 🛠️ Local Development Setup

**Clone the repository**
```bash
https://github.com/rana5699/next-six-client
```

**Navigate to the project directory**
```bash
cd medstore
```

**Install dependencies**
```bash
npm install
```

**Start the development server**
```bash
npm run dev
```

---

## 🔧 Environment Variables
Create a `.env` file at the root of the project and add the following variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_SECRET
NEXT_PUBLIC_CLOUDINARY_API_KEY
NEXT_PUBLIC_BASE_API
NEXT_PUBLIC_FAKE_IMAGE_URL
```

---

## 🔗 API Endpoints

### Authentication Routes
| Action | Method | Endpoint |
|--------|--------|---------------------------|
| Register | POST | `/api/auth/register` |
| Login | POST | `/api/auth/login` |

---

## 📸 Screenshots

> _Below are a few example screenshots of the application (Home, Product Details, Admin Dashboard)._  
_Add your image links here_

---

## 🌐 Live Demo

👉 https://next-assignment-six-alpha.vercel.app/

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss your proposal or submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it for your own projects.

---

## 🔗 Additional Repositories

| Repository | Description |
|-----------|-------------|
| **CycleHub** | Full-featured bicycle e-commerce platform 👉 https://github.com/mdsohelrana-contact/premium-bycycle-stroe-server |
| **Eventlyze** | Event planning & participation system 👉 https://github.com/mdsohelrana-contact/eventlyze-client |
