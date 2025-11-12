# AliAlaa Portfolio 🚀

A professional personal portfolio website built with **Next.js 15** and **Firebase**. Showcase your projects and achievements with a complete admin dashboard for managing projects and messages.

## 🎯 Key Features

- ✅ **Project Showcase:** Professional portfolio page with filtering and search functionality
- ✅ **Contact Form:** Receive messages and store them in Firestore
- ✅ **Admin Dashboard:** Add, edit, and delete projects; manage incoming messages
- ✅ **Responsive Design:** Works seamlessly across all devices (mobile, tablet, desktop)
- ✅ **Dark/Light Mode:** Full support for dark and light themes
- ✅ **Interactive Analytics:** Dashboard with charts powered by Recharts

---

## 📚 Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | Core framework (SSR, SSG, API Routes) |
| **React 18** | UI library |
| **TypeScript** | Strong type system for safer code |
| **Tailwind CSS** | Modern, responsive design system |
| **ShadCN UI** | Professional, accessible UI components |
| **Firebase/Firestore** | Cloud database |
| **Recharts** | Interactive data visualization |
| **Lucide Icons** | Beautiful SVG icons |

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Pages and routes
│   │   ├── page.tsx            # 🏠 Home (featured projects)
│   │   ├── portfolio/          # 🎨 All projects with filtering
│   │   ├── about/              # 👤 About the developer
│   │   ├── contact/            # 📧 Contact form
│   │   ├── blog/               # 📝 Blog (coming soon)
│   │   ├── login/              # 🔐 Admin login
│   │   ├── dashboard/          # 🎛️ Admin dashboard
│   │   │   ├── page.tsx        # Dashboard overview
│   │   │   ├── projects/       # Manage projects
│   │   │   ├── messages/       # View messages
│   │   │   └── settings/       # Account settings
│   │   ├── api/                # API endpoints
│   │   │   ├── login/          # POST admin authentication
│   │   │   ├── projects/       # GET/POST/DELETE projects
│   │   │   ├── messages/       # GET messages from database
│   │   │   └── contact/        # POST new messages
│   │   ├── layout.tsx          # Main layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # ShadCN UI components
│   │   └── layout/             # Navbar, Footer
│   ├── lib/
│   │   ├── firebase.ts         # Firebase client config
│   │   ├── firebase-admin.js   # Firebase admin config
│   │   └── utils.ts            # Utility functions
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/Light mode context
│   ├── hooks/
│   │   ├── use-toast.ts        # Toast notifications
│   │   └── use-mobile.tsx      # Mobile detection hook
│   ├── data/
│   │   └── mockData.ts         # Reference mock data
├── public/                     # Static assets
├── .env.example                # Example environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 🔧 Prerequisites & Installation

### Requirements:
- **Node.js** 18+ or 20 (recommended)
- **npm**, **yarn**, or **pnpm**
- **Firebase Account** (for production)

### Installation Steps:

#### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd portfolio
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Set Up Environment Variables
```bash
# Copy the example file
cp .env .env.local

# Edit the file with your actual credentials
```

---

## 📝 Environment Variables (.env.local)

Copy this to your `.env.local` file and update with real values:

```env
# ========== Admin Credentials ==========
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# ========== Firebase Client (exposed to browser) ==========
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDEXAMPLE_YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789000
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# ========== Firebase Admin (server-side only - SECRET!) ==========
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"

# ========== Database (optional - for future use) ==========
DB_HOST=
DB_PORT=26257
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_SSL_ROOT_CERT_PATH=
```

### 🔑 How to Get Firebase Credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click ⚙️ **Project Settings** (bottom of sidebar)
4. Go to **Service Accounts** tab
5. Choose **Node.js** as the language
6. Click **Generate New Private Key**
7. A JSON file will download—keep it secure (never commit to Git!)
8. Copy the values as shown below:

```json
{
  "project_id": "your-project-id",  ← Copy this
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",  ← And this
  "client_email": "firebase-adminsdk-xxxxx@...",  ← And this
  ...
}
```

### 💻 Setting Up Firebase Keys in PowerShell:

```powershell
# Read the JSON file you downloaded
$serviceAccount = Get-Content 'C:\path\to\serviceAccountKey.json' -Raw | ConvertFrom-Json

# Set environment variables for current session
[Environment]::SetEnvironmentVariable('FIREBASE_PROJECT_ID', $serviceAccount.project_id, 'Process')
[Environment]::SetEnvironmentVariable('FIREBASE_ADMIN_CLIENT_EMAIL', $serviceAccount.client_email, 'Process')
[Environment]::SetEnvironmentVariable('FIREBASE_ADMIN_PRIVATE_KEY', $serviceAccount.private_key, 'Process')

# Verify
Write-Host "Project ID: $env:FIREBASE_PROJECT_ID"
Write-Host "Client Email: $env:FIREBASE_ADMIN_CLIENT_EMAIL"
```

**Note:** This sets variables for the current session only. For permanent setup, use `.env.local` instead.

---

## 🏃‍♂️ Running the Project

### Development Mode:
```bash
npm run dev
```
Open browser to: **http://localhost:9002**

### Production Build:
```bash
npm run build
npm run start
```

### Code Quality Checks:
```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

---

## 📖 Usage Guide

### 🌐 Public Pages (for visitors):

| Page | Route | Description |
|------|-------|-------------|
| 🏠 **Home** | `/` | Featured projects showcase |
| 🎨 **Portfolio** | `/portfolio` | All projects with filtering & search |
| 👤 **About** | `/about` | Developer bio and skills |
| 📧 **Contact** | `/contact` | Contact form |
| 📝 **Blog** | `/blog` | Blog (coming soon) |

### 🔐 Admin Dashboard (after login):

| Page | Route | Description |
|------|-------|-------------|
| 🔐 **Login** | `/login` | Enter ADMIN_EMAIL and ADMIN_PASSWORD |
| 🎛️ **Dashboard** | `/dashboard` | Overview stats |
| 📊 **Projects** | `/dashboard/projects` | Add/edit/delete projects |
| 💬 **Messages** | `/dashboard/messages` | View received messages |
| ⚙️ **Settings** | `/dashboard/settings` | Account settings |

---

## ✨ Adding a New Project

1. Go to **`/dashboard/projects`**
2. Click **"Add New Project"** (blue button)
3. Fill in the form:

| Field | Example | Notes |
|-------|---------|-------|
| **Title** | My Awesome Website | Project name |
| **Description** | A modern website built with React... | Detailed description |
| **Category** | Web Application | Category (can create new) |
| **Technologies** | React, Firebase, Tailwind | Comma-separated |
| **Tags** | React, Full-stack, UI | Search tags |
| **Image URL** | https://i.postimg.cc/Yj075jqM/...png | **HTTPS only** |
| **Image AI Hint** | modern website | 1-2 descriptive words |
| **GitHub Link** | https://github.com/... | Optional |
| **Live Demo** | https://example.com | Optional |

4. Click **"Save Project"**
5. Image appears instantly!

### 📸 Supported Image Hosts:

✅ **Works:**
- `https://images.unsplash.com/...`
- `https://i.postimg.cc/...`
- `https://firebasestorage.googleapis.com/...`
- `https://via.placeholder.com/...`
- Any HTTPS URL

❌ **Doesn't work:**
- `http://...` (insecure)
- Local file paths
- localhost URLs

---

## 🔐 Security Best Practices

### ⚠️ Never commit to Git:
- ✗ Real Firebase private keys
- ✗ Admin passwords
- ✗ Sensitive credentials

### ✅ Best Practices:
- Use `.env.local` for local development only
- Store production variables in your hosting dashboard (Vercel, Firebase, etc.)
- Enable HTTPS in production
- Use strong admin passwords
- Never share Firebase keys with anyone

---

## 🐛 Troubleshooting

### ❌ Images Not Displaying

**Solution:**
```
✓ URL starts with https:// (not http://)
✓ Restart server: npm run dev
✓ Domain is in next.config.ts remotePatterns
```

### ❌ Firebase Credentials Missing

**Solution:**
```
✓ Verify FIREBASE_PROJECT_ID is set
✓ Verify FIREBASE_ADMIN_CLIENT_EMAIL is set
✓ Verify FIREBASE_ADMIN_PRIVATE_KEY format is correct
  (must include \n for newlines)
```

### ❌ Cannot Login

**Solution:**
```
✓ Check email and password in .env.local
✓ Credentials are case-sensitive
✓ Clear browser cache: Ctrl+Shift+Del
✓ Clear LocalStorage: F12 → Application → Clear
```

---

## 📈 Roadmap

- [ ] ✨ Full blog management system
- [ ] 🔐 Secure authentication with NextAuth.js
- [ ] 🖼️ Direct image upload to Firebase Storage
- [ ] 📧 Email integration
- [ ] 💾 Automated backups

---

## 🚀 Deployment

### Firebase App Hosting:
```bash
npm run build
firebase deploy
```

### Vercel (Recommended):
```bash
npm install -g vercel
vercel
```
Then add environment variables via Vercel Dashboard.

### Other Hosting:
```bash
npm run build
npm run start
```

---

## 📊 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/login` | Admin authentication |
| **GET** | `/api/projects` | Fetch all projects |
| **POST** | `/api/projects` | Create new project |
| **DELETE** | `/api/projects/[id]` | Delete project |
| **GET** | `/api/messages` | Fetch messages |
| **POST** | `/api/contact` | Submit message |
| **PUT** | `/api/contact` | Update message |
| **DELETE** | `/api/contact` | Delete message |

---

## 💡 Code Quality

- **TypeScript:** Full type safety
- **ESLint:** Code quality checks
- **Next.js:** Best practices built-in
- **Responsive:** Mobile-first design
- **Accessible:** WCAG compliant components

---

## 📞 Contact Information

- 📧 **Email:** alialaa0101617720@gmail.com
- 📍 **Location:** Cairo, Egypt
- 📱 **Phone:** (+20) 1023783620

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📦 Dependencies

See `package.json` for complete dependency list. Key packages:
- `next@15.x` - React framework
- `react@18.x` - UI library
- `firebase@latest` - Backend
- `tailwindcss@latest` - Styling
- `typescript@latest` - Type checking

---

## 🎯 Project Goals

1. ✅ Showcase skills and projects professionally
2. ✅ Manage content without database complexity
3. ✅ Responsive, fast, and accessible
4. ✅ Easy to customize and deploy
5. ✅ Secure and maintainable codebase

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | Nov 2025 | Initial release |

---

**Last Updated:** November 12, 2025  
**Status:** 🟢 Production Ready  
**Maintainer:** AliAlaa

---

## Quick Start Checklist

- [ ] Install Node.js 18+
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env` to `.env.local`
- [ ] Add Firebase credentials to `.env.local`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:9002
- [ ] Test login with admin credentials
- [ ] Add a test project
- [ ] Deploy to production

---

**Happy coding! 🚀**
