# 🚀 CRM - Professional Lead Management System

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **production-ready Client Relationship Management (CRM) system** built for agencies, freelancers, and startups to manage incoming leads from website contact forms.

## 📸 Screenshots

| Dashboard | Leads Management |
|-----------|------------------|
| ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard+Preview) | ![Leads](https://via.placeholder.com/400x200?text=Leads+Preview) |

---

## ✨ Features

### 🎯 Core CRM Features
- ✅ **Lead Listing** - View all leads with name, email, source, and status
- ✅ **Status Updates** - Update lead status (New → Contacted → Qualified → Converted → Lost)
- ✅ **Notes Tracking** - Add and manage follow-up notes for each lead
- ✅ **Secure Authentication** - JWT-based admin login system

### 📊 Advanced Analytics
- 📈 **Lead Distribution Chart** - Donut chart showing status breakdown
- 📉 **Monthly Trend Chart** - Track leads and conversions over time
- 🎯 **Conversion Funnel** - Visual lead progression through stages
- ⏱️ **Response Time Tracking** - Average response time metrics
- 🔍 **Lead Source Analytics** - Track where leads come from

### 💬 Communication Tools
- 📧 **Email Integration** - Send emails directly with templates
- 💬 **WhatsApp Integration** - One-click WhatsApp messages
- 📝 **Communication History** - Log all interactions with leads

### 🏷️ Lead Management
- 🏷️ **Tag System** - Add tags like "hot", "vip", "enterprise"
- 🎯 **Lead Scoring** - Auto-calculated 0-100 quality score
- 🔥 **Score Badges** - Hot 🔥 (70+), Warm 🟡 (40-69), Cold ❄️ (0-39)
- 📦 **Bulk Actions** - Update status, add tags, delete multiple leads
- 🔎 **Search & Filter** - Search by name/email, filter by status/tags
- 📄 **Export to CSV** - Download lead data

### 👥 User Management
- 👥 **Multi-User Support** - Create multiple admin/manager/viewer accounts
- 🔐 **Role-Based Access** - Admin, Manager, Viewer permissions
- 👑 **Admin Panel** - Complete user management interface

### 🎨 UI/UX
- 🌙 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔔 **Real-time Notifications** - Instant updates on lead changes
- 🐛 **Debug Panel** - Built-in debugging tools
- ⚡ **Keyboard Shortcuts** - Power user productivity

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2 | UI Framework |
| Tailwind CSS | 3.3 | Styling |
| Chart.js | 4.4 | Analytics Charts |
| Axios | 1.6 | API Calls |
| React Router | 6.20 | Navigation |
| Lucide React | Latest | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express.js | 4.18 | API Framework |
| Postgres | 15+ | Database |
| Prisma | 5.x | ORM |
| JWT | 9.0 | Authentication |
| bcryptjs | 2.4 | Password Hashing |

---

## 📁 Project Structure
FUTURE_FS_02/
├── backend/
│ ├── config/ 
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
│ ├── prisma/ 
│ ├── prismaClient.js
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── index.js
│ ├── .env
│ └── package.json
├── .gitignore
└── README.md


---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14+)
- Postgres (v12+)
- Git

### Quick start

1. Clone the repository

```bash
git clone <your-repo-url>
cd FUTURE_FS_02
```

2. Backend (Postgres + Prisma)

```bash
cd backend
npm install
# set DATABASE_URL in .env, e.g.:
# DATABASE_URL=postgresql://user:pass@localhost:5432/crm_db
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

3. Frontend

```bash
cd frontend
npm install
npm start
```

Default admin credentials are created by the seeder in `backend/prisma/seed.js`.
📋 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/login	Admin login	No
POST	/api/auth/register	Register new user	No
GET	/api/leads	Get all leads	Yes
POST	/api/leads	Create new lead	No (for forms)
PUT	/api/leads/:id/status	Update lead status	Yes
POST	/api/leads/:id/notes	Add note	Yes
GET	/api/leads/analytics	Get analytics	Yes
GET	/api/users	Get all users	Yes (Admin)
POST	/api/users	Create user	Yes (Admin)
🎯 User Roles & Permissions
Action	Admin	Manager	Viewer
View Dashboard	✅	✅	✅
View Leads	✅	✅	✅
Add/Edit Leads	✅	✅	❌
Delete Leads	✅	✅	❌
Manage Users	✅	❌	❌
Export Data	✅	✅	✅
⌨️ Keyboard Shortcuts
Shortcut	Action
Ctrl + N	Add New Lead
Ctrl + D	Go to Dashboard
Ctrl + L	Go to Leads
Ctrl + U	Go to Users
Esc	Close Modal
🐛 Debug Panel
Click the 🐛 (bug icon) at the bottom right corner to access:

Test backend connection

View API logs

Check authentication status

Debug API endpoints

📦 Deployment
Deploy Backend (Render/Heroku)
bash
# Add MongoDB Atlas connection string
# Set environment variables on hosting platform
Deploy Frontend (Vercel/Netlify)
bash
cd frontend
npm run build
# Deploy the build folder
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
Built as part of Full Stack Web Development – Task 2 (2026) by Future Interns

Inspired by real-world CRM systems used by agencies and freelancers

📞 Contact
GitHub: <your-github-handle>

Project Link: <your-project-link>

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!

🎯 Business Value
This CRM solves real business problems:

Question	How CRM Answers
How quickly can I see new leads?	Dashboard shows stats + recent leads instantly
Can I track follow-ups easily?	Notes system + communication history
Can I see which leads converted?	Conversion Rate card + Funnel chart
Can my team collaborate?	Multi-user with role-based access
Can I communicate with leads?	Email + WhatsApp integration
Built by project contributors
