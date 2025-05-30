# Urlhub

**Urlhub** is a full-stack URL shortening application built with Next.js, TypeScript, MongoDB, and NextAuth. It allows users to register, log in (via credentials, Google, or GitHub), and manage their shortened URLs through a user-friendly dashboard.

## 🌐 Live Demo

Access the live application here: [urlhub-rouge.vercel.app](https://urlhub-rouge.vercel.app)

## 🚀 Features

* **User Authentication**: Secure login and registration using credentials, Google, or GitHub via NextAuth.
* **URL Shortening**: Generate shortened URLs that redirect to the original links.
* **Dashboard**: View and manage your shortened URLs in a centralized dashboard.
* **Responsive Design**: Optimized for various devices using Tailwind CSS.
* **Secure**: Passwords are hashed using bcrypt, and JWTs are utilized for session management.

## 🛠️ Tech Stack

* **Frontend**: Next.js, TypeScript, Tailwind CSS
* **Backend**: Next.js API Routes, MongoDB, Mongoose
* **Authentication**: NextAuth.js with Credentials, Google, and GitHub providers
* **Deployment**: Vercel

## 📸 Screenshots



![image](https://github.com/user-attachments/assets/49073f41-2290-4369-bacf-629afdc4cba4)

![image](https://github.com/user-attachments/assets/68c9a482-52ad-4291-a1b2-cb4f2751914c)

![image](https://github.com/user-attachments/assets/4aa36c33-c44c-4e4d-b170-833198d44e0c)

![image](https://github.com/user-attachments/assets/7157df60-90bf-4975-b144-8c6c9befcb4c)


## 🧰 Getting Started

### Prerequisites

* Node.js (v14 or later)
* npm or yarn
* MongoDB instance (local or hosted)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PranavPatil9765/Urlhub.git
   cd Urlhub
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   MONGODB_URI=your_mongodb_connection_string
   ```

   *Replace the placeholder values with your actual credentials.*

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## 📦 Deployment

The application is ready for deployment on platforms like Vercel.

1. **Push your code to GitHub.**
2. **Import your repository into Vercel.**
3. **Set the environment variables in Vercel's dashboard.**
4. **Deploy the application.**

For detailed instructions, refer to Vercel's [Next.js deployment guide](https://vercel.com/docs/concepts/frameworks/next.js/overview).

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
