
# MedStore - E-commerce Platform

MedStore is a modern e-commerce application built using providing a seamless shopping experience for medical products. The project follows best practices in performance, accessibility, and scalability.


---

## Features !!

- Fast and Scalable: Built with Next.js for server-side rendering and static site generation.
- User Authentication: Supports authentication using Firebase/Auth or other third-party providers.
- Admin Dashboard: Manage products, orders, and users from a dedicated admin panel.
- Order Tracking: Customers can track their orders in real time.
- Search and Filtering: Advanced search functionality with category and price filtering.

---


###  `Technologies` Used

- Backend : `Express.js` with `TypeScript`
- Database : `MongoDB` with `Mongoose`
- Error Handling : Fllow globals errorHandle model
- Environment Variables : Managed with `dotenv`


## Run Locally

Clone the project

```bash
  https://github.com/rana5699/next-six-client
```

Go to the project directory

```bash
 cd medstore

```

Install dependencies

```bash
  npm install -y
```

Start the server

```bash
  npm run dev
```



## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_SECRET`

`NEXT_PUBLIC_CLOUDINARY_API_KEY`

`NEXT_PUBLIC_BASE_API`

`NEXT_PUBLIC_FAKE_IMAGE_URL`






## API Reference

### Authentication

## Users

### Register User (POST)

```http
  /api/auth/register
```


#### Login user (POST)

```http
  /api/auth/login
```



## Server Live URL

https://next-assignment-six-alpha.vercel.app/
