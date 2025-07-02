# React + Vite

🚀 Tech Stack
⚛️ React – Frontend library

🧩 Appwrite – Backend-as-a-Service (Auth, DB, Storage)

🎯 Custom Hooks – For managing form state and validation

💨 Tailwind CSS – Utility-first CSS framework

📝 Rich Text Editor – For blog content formatting


✨ Features
🔐 User Authentication (Sign Up / Login / Logout)

📝 Create, Edit, and Delete Blogs

📁 Upload and display blog cover images using Appwrite Storage

🌈 Responsive and clean UI

🧠 Custom hooks for reusable form logic

📰 Rich Text Editor for formatting blog content


🔧 Installation & Setup
# Clone the repo
git clone https://github.com/yourusername/blog-app.git
cd blog-app

# Install dependencies
npm install

# Run the development server
npm run dev

🔑 Environment Variables

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

📁 Folder Structure

src/
├── components/        # UI components
├── pages/             # Route-based pages
├── hooks/             # Custom form hooks
│   └── useForm.js
├── utils/             # Appwrite config & helpers
├── App.jsx            # App routes
├── main.jsx           # Entry point
└── index.css          # Tailwind base styles


📗 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Crafted with ❤️ by Swayam Agarwal
