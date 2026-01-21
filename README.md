<p align="center"># 🎓 JoshNet

  <img src="https://img.shields.io/badge/JoshNet-V3-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDEwdjZNMiAxMGw0LTZoMTJsNCA2Ii8+PHBhdGggZD0iTTYgMTR2OCIvPjxwYXRoIGQ9Ik0xOCAxNHY4Ii8+PHBhdGggZD0iTTEwIDE0djgiLz48cGF0aCBkPSJNMTQgMTR2OCIvPjwvc3ZnPg==" alt="JoshNet Logo"/>

</p>> A next-generation campus ecosystem that brings your entire college community together in one intelligent, role-aware mobile platform.



<h1 align="center">🎓 JoshNet - Campus Ecosystem Platform</h1>[![React Native](https://img.shields.io/badge/React%20Native-Expo%2052-blue.svg)](https://expo.dev/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

<p align="center">[![NativeWind](https://img.shields.io/badge/NativeWind-v4-38bdf8)](https://www.nativewind.dev/)

  <strong>A next-generation campus ecosystem bringing your entire college community together in one intelligent, role-aware mobile platform.</strong>[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</p>

---

<p align="center">

  <a href="#features">Features</a> •## ✨ What is JoshNet?

  <a href="#tech-stack">Tech Stack</a> •

  <a href="#architecture">Architecture</a> •JoshNet V3 transforms how students, faculty, alumni, and administrators interact on campus. Think of it as Discord meets your student portal—featuring real-time chat, AI-powered assistance, academic tracking, and role-specific tools all wrapped in a beautiful, intuitive interface.

  <a href="#installation">Installation</a> •

  <a href="#api-documentation">API Docs</a> •### 🎯 Key Highlights

  <a href="#contributors">Contributors</a>

</p>- **🔐 Role-Based Architecture** - Purpose-built experiences for Students, Faculty, Alumni, and Admins

- **💬 Real-Time Communication** - Discord-inspired channels for classes, committees, and departments  

<p align="center">- **🤖 Josephine AI Assistant** - Your personal campus AI companion

  <img src="https://img.shields.io/badge/React%20Native-Expo%2054-61DAFB?style=flat-square&logo=react" alt="React Native"/>- **📊 Smart Analytics** - Track attendance, grades, and eligibility in real-time

  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js" alt="Node.js"/>- **📱 Native Performance** - Smooth, responsive experience built with React Native

  <img src="https://img.shields.io/badge/MongoDB-8.x-47A248?style=flat-square&logo=mongodb" alt="MongoDB"/>

  <img src="https://img.shields.io/badge/Socket.IO-4.x-010101?style=flat-square&logo=socket.io" alt="Socket.IO"/>---

  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>

  <img src="https://img.shields.io/badge/Redis-5.x-DC382D?style=flat-square&logo=redis" alt="Redis"/>## 🚀 Tech Stack

  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>

</p>| Category | Technology |

|----------|-----------|

---| **Framework** | React Native (Expo SDK 52) |

| **Language** | TypeScript |

## 📋 Table of Contents| **Styling** | NativeWind v4 (Tailwind CSS 3.4) + clsx + tailwind-merge |

| **Navigation** | React Navigation v6 (Stack, Drawer, Bottom Tabs) |

- [About The Project](#-about-the-project)| **Charts** | React Native Chart Kit |

- [Features](#-features)| **Icons** | Expo Vector Icons (Ionicons, MaterialCommunityIcons) |

- [Tech Stack](#-tech-stack)| **Architecture** | Feature-Based with Role-Based Access Control (RBAC) |

- [System Architecture](#-system-architecture)

- [Project Structure](#-project-structure)---

- [Database Schema](#-database-schema)

- [API Documentation](#-api-documentation)## 📂 Project Structure

- [Frontend Modules](#-frontend-modules)

- [Backend Modules](#-backend-modules)```

- [Real-Time Features](#-real-time-features)src/

- [Installation & Setup](#-installation--setup)├── app/                      # Application entry point

- [Environment Variables](#-environment-variables)├── components/            

- [Running the Application](#-running-the-application)│   ├── ui/                   # Reusable primitives (Button, Input, Card)

- [Testing](#-testing)│   └── shared/               # Complex shared components

- [Future Roadmap](#-future-roadmap)├── context/                  # Global state management

- [Contributors](#-contributors)│   ├── AuthContext.tsx       # Authentication & role management

- [Acknowledgments](#-acknowledgments)│   └── UserContext.tsx       # User profile data

- [License](#-license)├── features/                 # Feature modules by user role

│   ├── auth/                 # Login, Signup, OTP, Password Reset

---│   ├── student/              # Student-specific features

│   │   ├── screens/          # Dashboard, Attendance, Materials

## 🎯 About The Project│   │   └── components/       # Student UI components

│   ├── faculty/              # Faculty workspace & tools

**JoshNet V3** is a comprehensive campus ecosystem mobile application developed as a **Final Year Project** for the **BBA IT (Bachelor of Business Administration in Information Technology)** program at **St. Joseph's Degree & PG College, Hyderabad**.│   ├── alumni/               # Alumni networking & mentorship

│   └── admin/                # Administration & analytics

The application transforms how students, faculty, alumni, and administrators interact on campus by combining:├── lib/                      # Utility functions

- **Discord-inspired** real-time communication│   └── utils.ts              # cn() class merger & helpers

- **AI-powered** assistance with Josephine (Claude AI)├── navigation/               # Navigation configuration

- **Academic management** tools│   ├── RootNavigator.tsx     # Main routing logic

- **Role-based access control** for secure, personalized experiences│   └── CustomDrawer.tsx      # Discord-style sidebar

└── services/                 # API service layer

### 🎯 Problem Statement```



Traditional campus management systems are fragmented—students use multiple apps for attendance, materials, communication, and academic tracking. JoshNet unifies these into a single, intelligent platform.---



### 💡 Solution## 👥 User Roles & Features



A mobile-first platform with:### 🎒 Student Portal

- Unified communication channels

- AI assistant for instant helpThe student experience is designed around community and academic success.

- Real-time attendance and academic tracking

- Role-specific dashboards**Features:**

- Secure file sharing and material management- **Discord-Style Navigation** - Intuitive sidebar with servers for Classes, Committees, and Alumni connections

- **Josephine AI** - Your 24/7 AI assistant for campus questions, homework help, and guidance

---- **Materials Repository** - Organized accordion view: Semesters → Subjects → PDFs/Resources

- **Attendance Dashboard** - Visual heatmaps with 75% eligibility calculator and predictions

## ✨ Features- **Academic Profile** - Real-time CGPA tracking, attendance stats, and performance insights



### 🔐 Authentication & Security### 👨‍🏫 Faculty Workspace

| Feature | Description |

|---------|-------------|Streamlined tools for educators to focus on teaching, not administration.

| **JWT Authentication** | Secure token-based authentication with access & refresh tokens |

| **OAuth 2.0** | Google Sign-In integration via Passport.js |**Features:**

| **OTP Verification** | Email-based OTP for account verification and password reset |- **Smart Attendance** - Quick mark entry with class rosters and analytics

| **Two-Factor Authentication** | Additional security layer for sensitive operations |- **Marks Management** - Internal assessment entry (IA1, IA2) with auto-calculation

| **Account Lockout** | Automatic lockout after failed login attempts |- **Interactive Timetable** - Day-to-day lecture schedule with room assignments

| **Session Management** | Track and manage active sessions across devices |- **Department Communication** - Dedicated chat rooms for faculty collaboration

| **Geo-location Tracking** | Login location tracking for security |- **Class Channels** - Direct communication with student batches



### 💬 Real-Time Communication### 🎓 Alumni Network

| Feature | Description |

|---------|-------------|Stay connected with your alma mater and give back to the community.

| **Servers & Channels** | Discord-style server organization with text channels |

| **Direct Messaging** | Private conversations between users |**Features:**

| **Friend System** | Send, accept, reject friend requests |- **Batch Connections** - Reconnect with classmates through batch-specific channels

| **Typing Indicators** | Real-time typing status in channels |- **Mentorship Program** - Guide current students in their career journey

| **Message Features** | Edit, delete, reply, forward messages |- **Event Hub** - Alumni meetups, reunions, and fundraising campaigns

| **File Attachments** | Share images, documents, and files in chat |- **Career Network** - Job postings and professional networking

| **User Presence** | Online/offline status tracking |

### 👔 Admin Dashboard

### 🤖 Josephine AI Assistant

| Feature | Description |Powerful oversight and management tools for campus administrators.

|---------|-------------|

| **AI Chat** | Powered by Anthropic Claude API |**Features:**

| **Context Awareness** | Understands campus-related queries |- **System Analytics** - Real-time metrics, user activity logs, and engagement stats

| **Chat History** | Persistent conversation storage |- **Global Announcements** - Broadcast important updates to the entire campus

| **File Analysis** | Upload documents for AI analysis |- **User Management** - Verify accounts, manage permissions, and moderate content

| **Starred Chats** | Bookmark important conversations |- **Feedback Center** - Review and respond to student/faculty feedback



### 📚 Academic Materials---

| Feature | Description |

|---------|-------------|## 🔐 Role-Based Access Control (RBAC)

| **Hierarchical Organization** | Semester → Subject → Materials structure |

| **File Management** | Upload, download, copy, move, delete files |JoshNet uses a "Traffic Cop" navigation strategy to ensure secure, role-appropriate experiences. 

| **AWS S3 Storage** | Secure cloud storage for all materials |

| **Bulk Operations** | Download multiple files as ZIP |**How it works:**

| **Access Control** | Role-based material access |1. User logs in and receives a role token (`STUDENT`, `FACULTY`, `ALUMNI`, `ADMIN`)

2. `RootNavigator.tsx` acts as a security gateway

### 📊 Attendance & Analytics3. Role-specific navigator is rendered (e.g., `StudentNavigator`)

| Feature | Description |4. All screens and features are scoped to that role—no cross-contamination

|---------|-------------|

| **Real-time Tracking** | Current attendance percentage |> **Security Note:** A user logged in as Student cannot access Faculty or Admin screens, even by manipulating routes.

| **Eligibility Calculator** | 75% attendance requirement checker |

| **Visual Heatmaps** | Calendar-based attendance visualization |---

| **Predictions** | Attendance prediction algorithms |

| **Web Scraping** | Automated data from college portal |## 🛠️ Getting Started



### 👥 User Roles### Prerequisites

| Role | Capabilities |

|------|--------------|- **Node.js** (LTS version recommended)

| **Student** | Chat, materials, attendance, AI assistant, friends |- **Expo CLI** (`npm install -g expo-cli`)

| **Faculty** | Attendance marking, material upload, class management |- **iOS Simulator** or **Android Emulator** (or use Expo Go on your phone)

| **Alumni** | Networking, mentorship, batch connections |

| **Admin** | User management, analytics, system configuration |### Installation



---1. **Clone the repository**

   ```bash

## 🛠 Tech Stack   git clone https://github.com/noturbob/josh-net-app.git

   cd josh-net-app/frontend

### Backend Technologies   ```



| Category | Technology | Version | Purpose |2. **Install dependencies**  

|----------|------------|---------|---------|   We use `--legacy-peer-deps` to resolve peer dependency conflicts between NativeWind v4 and Tailwind 3.4.

| **Runtime** | Node.js | 20.x LTS | JavaScript runtime |   ```bash

| **Framework** | Express.js | 5.x | Web application framework |   npm install --legacy-peer-deps

| **Database** | MongoDB | 8.x | Primary data storage |   ```

| **ODM** | Mongoose | 8.19.x | MongoDB object modeling |

| **Cache** | Redis | 5.x | Session & data caching |3. **Install Expo modules**

| **Real-time** | Socket.IO | 4.8.x | WebSocket communication |   ```bash

| **Authentication** | Passport.js | 0.7.x | OAuth & authentication |   npx expo install react-native-reanimated react-native-safe-area-context \

| **JWT** | jsonwebtoken | 9.x | Token generation & verification |     react-native-gesture-handler react-native-screens react-native-svg

| **File Storage** | AWS S3 | SDK 3.x | Cloud file storage |   ```

| **Email** | Nodemailer | 7.x | Email notifications |

| **AI** | Anthropic API | Claude 3.5 | AI chatbot integration |4. **Start the development server**  

| **Web Scraping** | Puppeteer | 24.x | Browser automation |   Always use `--clear` to reset the CSS compiler cache.

| **Scraping Parser** | Cheerio | 1.x | HTML parsing |   ```bash

   npx expo start --clear

### Frontend Technologies   ```



| Category | Technology | Version | Purpose |5. **Run on device**

|----------|------------|---------|---------|   - Press `i` for iOS Simulator

| **Framework** | React Native | 0.81.x | Cross-platform mobile |   - Press `a` for Android Emulator

| **Platform** | Expo | SDK 54 | Development & build tools |   - Scan QR code with Expo Go app on your phone

| **Language** | TypeScript | 5.9.x | Type-safe JavaScript |

| **Styling** | NativeWind | 4.2.x | Tailwind CSS for RN |---

| **CSS** | Tailwind CSS | 3.4.x | Utility-first CSS |

| **Navigation** | React Navigation | 7.x | App navigation |## 🎨 Styling Guide

| **State** | React Context | - | Global state management |

| **HTTP Client** | Fetch API | - | API communication |JoshNet uses a **shadcn-inspired design system** built on NativeWind (Tailwind for React Native).

| **WebSocket** | Socket.IO Client | 4.7.x | Real-time features |

| **Storage** | AsyncStorage | 2.1.x | Local data persistence |### The `cn()` Utility

| **File Picker** | Expo Document Picker | 13.1.x | File selection |

| **Icons** | Expo Vector Icons | 14.x | Icon library |Our secret weapon for dynamic, mergeable class names:



---```tsx

import { cn } from '@/lib/utils';

## 🏗 System Architecture

// Base component with overridable styles

### High-Level Architecturefunction Card({ className, ...props }) {

  return (

```    <View 

┌─────────────────────────────────────────────────────────────────────────┐      className={cn(

│                           CLIENT LAYER                                   │        "bg-zinc-900 rounded-xl p-4 shadow-lg",

│  ┌─────────────────────────────────────────────────────────────────┐   │        className // Allows parent to override

│  │                    React Native (Expo)                           │   │      )}

│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│   │      {...props}

│  │  │   Auth   │  │  Server  │  │  Inbox   │  │    Josephine     ││   │    />

│  │  │ Context  │  │ Context  │  │ Context  │  │     Context      ││   │  );

│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│   │}

│  │  ┌────────────────────────────────────────────────────────────┐│   │

│  │  │              Service Layer (API + Socket)                   ││   │// Usage

│  │  └────────────────────────────────────────────────────────────┘│   │<Card className="bg-indigo-500 p-6">

│  └─────────────────────────────────────────────────────────────────┘   │  <Text className="text-white">Custom styled card</Text>

└─────────────────────────────────────────────────────────────────────────┘</Card>

                                    │```

                    ┌───────────────┴───────────────┐

                    │         HTTP/HTTPS            │### Color System

                    │         WebSocket             │

                    └───────────────┬───────────────┘Defined in `tailwind.config.js` for consistent theming:

                                    │

┌─────────────────────────────────────────────────────────────────────────┐| Variable | Color | Usage |

│                           SERVER LAYER                                   │|----------|-------|-------|

│  ┌─────────────────────────────────────────────────────────────────┐   │| `bg-background` | Zinc 950 | Main app background |

│  │                    Express.js + Socket.IO                        │   │| `bg-primary` | Indigo 500 | Primary actions, CTAs |

│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│   │| `bg-secondary` | Teal 500 | Student role theme |

│  │  │  Routes  │  │Middleware│  │Controllers│ │     Sockets      ││   │| `bg-accent` | Amber 500 | Faculty role theme |

│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│   │| `bg-danger` | Rose 500 | Warnings, admin actions |

│  │  ┌────────────────────────────────────────────────────────────┐│   │| `text-foreground` | Zinc 50 | Primary text |

│  │  │                    Services Layer                           ││   │| `text-muted` | Zinc 400 | Secondary text |

│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌───────────────┐ ││   │

│  │  │  │  Email  │  │ Scraper │  │   S3    │  │   Anthropic   │ ││   │### Component Patterns

│  │  │  └─────────┘  └─────────┘  └─────────┘  └───────────────┘ ││   │

│  │  └────────────────────────────────────────────────────────────┘│   │```tsx

│  └─────────────────────────────────────────────────────────────────┘   │// ✅ Good - Using utility classes

└─────────────────────────────────────────────────────────────────────────┘<Button className="bg-primary text-white px-6 py-3 rounded-lg">

                                    │  Submit

                    ┌───────────────┴───────────────┐</Button>

                    │                               │

┌───────────────────┴─────────┐     ┌──────────────┴───────────────────┐// ❌ Avoid - Inline styles

│         DATA LAYER          │     │         EXTERNAL SERVICES        │<Button style={{ backgroundColor: '#6366f1', padding: 12 }}>

│  ┌───────────┐ ┌──────────┐│     │  ┌─────────┐  ┌────────────────┐ │  Submit

│  │  MongoDB  │ │  Redis   ││     │  │ AWS S3  │  │  Anthropic AI  │ │</Button>

│  │ (Primary) │ │ (Cache)  ││     │  │ Storage │  │   (Claude)     │ │```

│  └───────────┘ └──────────┘│     │  └─────────┘  └────────────────┘ │

│  ┌─────────────────────────┐│     │  ┌─────────┐  ┌────────────────┐ │---

│  │    Mongoose Models      ││     │  │  Gmail  │  │  College Portal│ │

│  └─────────────────────────┘│     │  │  SMTP   │  │   (Scraping)   │ │## 🧩 Core Components

└─────────────────────────────┘     │  └─────────┘  └────────────────┘ │

                                    └──────────────────────────────────┘### `AuthContext.tsx`

```Manages authentication state and user roles. Provides `login()`, `logout()`, and `user` object throughout the app.



### Request Flow```tsx

const { user, role, login, logout } = useAuth();

``````

User Action → React Native Screen → Context/Hook → Service Layer

    → HTTP Request/Socket Emit → Express Router → Middleware Chain### `RootNavigator.tsx`

    → Controller → Service/Model → Database/External APIThe main navigation switch. Renders either:

    → Response → Service Layer → Context Update → UI Re-render- `AuthNavigator` - Login/Signup screens

```- `StudentNavigator` - Student-specific app

- `FacultyNavigator` - Faculty workspace

---- `AlumniNavigator` - Alumni network

- `AdminNavigator` - Admin dashboard

## 📁 Project Structure

### `CustomDrawer.tsx`

### Root DirectoryDiscord-inspired dual-pane sidebar for Students:

- Left pane: Server list (Classes, Committees, Alumni)

```- Right pane: Channel list within selected server

josh-net-app/- Smooth animations and haptic feedback

├── backend/                    # Node.js Express API Server

├── frontend/                   # React Native Expo Application---

├── README.md                   # This documentation file

└── .gitignore                  # Git ignore rules## 📱 Screenshots

```

*(Add screenshots here showing Student Dashboard, Faculty Workspace, Alumni Network, and Admin Analytics)*

### Backend Structure

---

```

backend/## 🤝 Contributing

├── config/                     # Configuration files

│   └── s3.config.js           # AWS S3 client configurationWe welcome contributions! Here's how to get started:

│

├── controllers/                # Request handlers (Business Logic)1. **Fork the repository**

│   ├── admin.controller.js    # Admin operations2. **Create a feature branch**

│   ├── auth.controller.js     # Authentication (login, register, OTP)   ```bash

│   ├── inbox.controller.js    # Friends & requests management   git checkout -b feature/amazing-feature

│   ├── josephine.controller.js # AI chatbot interactions   ```

│   ├── materials.controller.js # File & material management3. **Add your feature**

│   └── server.controller.js   # Server, channel, message operations   - Place new screens in `src/features/{role}/screens/`

│   - Register screens in the appropriate Navigator

├── database/                   # Database connections   - Follow existing code patterns and styling conventions

│   ├── connectDB.js           # MongoDB connection setup4. **Commit your changes**

│   └── redis.js               # Redis client configuration   ```bash

│   git commit -m "Add amazing feature"

├── middleware/                 # Express middleware   ```

│   ├── auth.middleware.js     # JWT verification & protection5. **Push and create a Pull Request**

│   ├── material.middleware.js # Material access validation   ```bash

│   ├── upload.middleware.js   # Multer file upload handling   git push origin feature/amazing-feature

│   └── voice.middleware.js    # Voice file processing   ```

│

├── models/                     # Mongoose schemas### Development Guidelines

│   ├── channel.model.js       # Channel schema (text/voice)

│   ├── chat.model.js          # AI chat conversation schema- Use TypeScript for all new files

│   ├── emoji.model.js         # Custom emoji schema- Follow the existing folder structure

│   ├── invite.model.js        # Server invite schema- Use the `cn()` utility for className merging

│   ├── material.model.js      # Academic material schema- Add comments for complex logic

│   ├── message.model.js       # Chat message schema- Test on both iOS and Android

│   ├── otp.model.js           # OTP verification schema

│   ├── savedUser.model.js     # Saved user preferences---

│   ├── server.model.js        # Server (community) schema

│   ├── user.model.js          # User account schema## 📝 License

│   ├── index.js               # Model exports

│   └── constants/             # Schema constantsThis project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

│       ├── index.js

│       └── materialSelections.js---

│

├── routes/                     # API route definitions## 🙏 Acknowledgments

│   ├── auth.routes.js         # /api/v1/auth/*

│   ├── inbox.routes.js        # /api/v1/inbox/*- Built with ❤️ for college campuses everywhere

│   ├── josephine.routes.js    # /api/v1/josephine/*- Inspired by Discord's excellent UX patterns

│   ├── materials.routes.js    # /api/v1/materials/*- Powered by the amazing Expo and React Native community

│   └── server.routes.js       # /api/v1/server/*

│---

├── scripts/                    # Utility scripts

│   └── seed/                  # Database seeding## 📞 Support

│       ├── index.js

│       ├── uploadDummyMaterials.jsHaving issues? We're here to help!

│       ├── uploadDummyUsers.js

│       └── uploadStandardEmojis.js- 🐛 [Report a Bug](https://github.com/noturbob/josh-net-app/issues)

│- 💡 [Request a Feature](https://github.com/noturbob/josh-net-app/issues)

├── services/                   # External service integrations- 📧 Email: 121423408057@josephscollege.ac.in

│   ├── email.service.js       # Nodemailer email sending

│   └── scraper.service.js     # Puppeteer web scraping---

│

├── sockets/                    # Socket.IO event handlers<div align="center">

│   ├── index.js               # Socket initialization & middleware  <strong>Made with 🎓 for students, by students</strong>

│   ├── channel.socket.js      # Channel join/leave events  <br>

│   ├── inbox.socket.js        # Friend request events  <sub>Star ⭐ this repo if you find it helpful!</sub>

│   ├── message.socket.js      # Message send/receive events</div>
│   └── server.socket.js       # Server membership events
│
├── tests/                      # Test suites
│   ├── jest.config.js         # Jest configuration
│   └── setup/
│       └── setupTests.js      # Test environment setup
│
├── utils/                      # Utility functions
│   ├── auth.utils.js          # Auth helper functions
│   ├── s3.utils.js            # S3 file operations
│   └── prompts/
│       └── josephine.prompts.js # AI system prompts
│
├── server.js                   # Application entry point
├── package.json                # Dependencies & scripts
└── .env                        # Environment variables (not in git)
```

### Frontend Structure

```
frontend/
├── assets/                     # Static assets (images, fonts)
│
├── src/
│   ├── components/             # Reusable UI components
│   │   └── ui/
│   │       ├── Button.tsx     # Custom button component
│   │       └── Input.tsx      # Custom input component
│   │
│   ├── config/                 # Configuration
│   │   └── api.config.ts      # API endpoints & base URL
│   │
│   ├── context/                # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   ├── ServerContext.tsx  # Server/channel state
│   │   ├── JosephineContext.tsx # AI chat state
│   │   ├── InboxContext.tsx   # Friends/requests state
│   │   └── index.ts           # Context exports
│   │
│   ├── features/               # Feature modules
│   │   ├── auth/              # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignUpScreen.tsx
│   │   │   ├── OtpScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── ResetPasswordScreen.tsx
│   │   │
│   │   ├── inbox/             # Inbox feature
│   │   │   └── InboxScreen.tsx # Friends & requests
│   │   │
│   │   └── student/           # Student features
│   │       ├── screens/
│   │       │   ├── StudentDashboard.tsx  # Main chat screen
│   │       │   └── StudentScreens.tsx    # Materials, Profile, etc.
│   │       └── components/
│   │           └── StudentDrawer.tsx     # Navigation drawer
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts           # cn() class merger
│   │
│   ├── navigation/             # Navigation configuration
│   │   ├── RootNavigator.tsx  # Main navigation switch
│   │   ├── AuthNavigator.tsx  # Auth flow navigation
│   │   └── StudentNavigator.tsx # Student drawer navigation
│   │
│   ├── screens/                # Standalone screens
│   │
│   └── services/               # API service layer
│       ├── api.client.ts      # HTTP client with auth
│       ├── auth.service.ts    # Authentication API
│       ├── server.service.ts  # Server/channel API
│       ├── inbox.service.ts   # Friends/requests API
│       ├── materials.service.ts # Materials API
│       ├── josephine.service.ts # AI chat API
│       ├── socket.service.ts  # WebSocket service
│       └── index.ts           # Service exports
│
├── App.tsx                     # Application entry point
├── index.ts                    # Expo entry
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── metro.config.js             # Metro bundler config
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── global.css                  # Global styles
└── package.json                # Dependencies & scripts
```

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│     User     │───────│    Server    │───────│   Channel    │
│──────────────│  N:M  │──────────────│  1:N  │──────────────│
│ _id          │       │ _id          │       │ _id          │
│ email        │       │ name         │       │ name         │
│ name         │       │ description  │       │ type         │
│ password     │       │ icon         │       │ server       │
│ role         │       │ owner        │       │ permissions  │
│ avatarURL    │       │ members[]    │       │ createdAt    │
│ friends[]    │       │ createdAt    │       └──────────────┘
│ servers[]    │       └──────────────┘              │
│ academic{}   │              │                      │
│ security{}   │              │                      │
│ tokens[]     │       ┌──────┴──────┐               │
└──────────────┘       │             │               │
       │         ┌─────┴────┐  ┌─────┴────┐   ┌─────┴────┐
       │         │  Invite  │  │  Emoji   │   │ Message  │
       │         │──────────│  │──────────│   │──────────│
       │         │ code     │  │ name     │   │ content  │
       │         │ server   │  │ url      │   │ author   │
       │         │ uses     │  │ server   │   │ channel  │
       │         │ maxUses  │  └──────────┘   │ replyTo  │
       │         │ expiresAt│                 │ attachments│
       │         └──────────┘                 │ reactions │
       │                                      └──────────┘
       │
┌──────┴──────┐       ┌──────────────┐       ┌──────────────┐
│    Chat     │───────│   Material   │       │     OTP      │
│─────────────│  1:N  │──────────────│       │──────────────│
│ _id         │       │ _id          │       │ _id          │
│ user        │       │ name         │       │ email        │
│ name        │       │ type         │       │ otp          │
│ messages[]  │       │ path         │       │ expiresAt    │
│ starred     │       │ parent       │       │ verified     │
│ createdAt   │       │ s3Key        │       └──────────────┘
└─────────────┘       │ size         │
                      │ uploadedBy   │
                      └──────────────┘
```

### Model Descriptions

| Model | Description | Key Fields |
|-------|-------------|------------|
| **User** | User account with auth & profile data | email, password, role, friends, servers, security settings |
| **Server** | Community/group container | name, icon, owner, members, channels |
| **Channel** | Communication channel within server | name, type (text/voice), server reference |
| **Message** | Chat message in a channel | content, author, attachments, reactions, replyTo |
| **Chat** | AI conversation with Josephine | user, messages array, starred status |
| **Material** | Academic file/folder | name, type, S3 key, parent folder, uploadedBy |
| **Invite** | Server invitation link | code, server, uses, maxUses, expiresAt |
| **OTP** | One-time password for verification | email, otp code, expiration, verified status |
| **Emoji** | Custom server emoji | name, URL, server reference |

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:8080/api/v1
Production:  https://api.joshnet.app/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/logout` | Logout current session | ✅ |
| POST | `/auth/logout-all` | Logout all sessions | ✅ |
| POST | `/auth/send-otp` | Send OTP to email | ❌ |
| POST | `/auth/verify-otp` | Verify OTP code | ❌ |
| POST | `/auth/change-password` | Change password | ❌ |
| POST | `/auth/refresh-token` | Refresh access token | ❌ |
| GET | `/auth/profile` | Get current user profile | ✅ |
| GET | `/auth/google` | Google OAuth initiation | ❌ |
| GET | `/auth/google/callback` | Google OAuth callback | ❌ |

### Server & Channel Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/server/list` | List user's servers | ✅ |
| POST | `/server/create` | Create new server | ✅ |
| POST | `/server/create-invite` | Generate invite code | ✅ |
| POST | `/server/join-invite` | Join via invite code | ✅ |
| POST | `/server/channel/create` | Create new channel | ✅ |
| GET | `/server/channel/list` | List server channels | ✅ |
| GET | `/server/message/list` | Get channel messages | ✅ |
| POST | `/server/message/forward` | Forward messages | ✅ |
| PATCH | `/server/message/edit` | Edit a message | ✅ |
| DELETE | `/server/message/delete` | Delete a message | ✅ |

### Inbox & Social Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/inbox/friends` | List friends & requests | ✅ |
| POST | `/inbox/search` | Search users | ✅ |
| POST | `/inbox/send-request` | Send friend request | ✅ |
| POST | `/inbox/accept-request` | Accept friend request | ✅ |
| POST | `/inbox/reject-request` | Reject friend request | ✅ |
| POST | `/inbox/cancel-request` | Cancel sent request | ✅ |

### Materials Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/materials/list` | List materials in folder | ✅ |
| POST | `/materials/upload` | Upload new material | ✅ |
| GET | `/materials/download/:id` | Download single file | ✅ |
| POST | `/materials/download-zip` | Download as ZIP | ✅ |
| POST | `/materials/copy` | Copy material | ✅ |
| POST | `/materials/move` | Move material | ✅ |
| DELETE | `/materials/delete/:id` | Delete material | ✅ |
| POST | `/materials/create-folder` | Create new folder | ✅ |

### Josephine AI Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/josephine/chats` | List all chats | ✅ |
| GET | `/josephine/chat/:id` | Get chat messages | ✅ |
| POST | `/josephine/prompt` | Send prompt to AI | ✅ |
| POST | `/josephine/modify` | Modify chat (star/rename) | ✅ |
| DELETE | `/josephine/chat/:id` | Delete chat | ✅ |

### Response Format

All API responses follow this structure:

```json
{
  "type": "success" | "error",
  "message": "Human-readable message",
  "data": { ... }  // Optional, contains response data
}
```

---

## 📱 Frontend Modules

### Authentication Module
- **Login Screen**: Email/password login with validation
- **Sign Up Screen**: Registration with role selection (Student/Faculty/Alumni)
- **OTP Screen**: 4-digit OTP verification with auto-focus and resend timer
- **Forgot Password**: Email input for password reset
- **Reset Password**: New password entry after OTP verification

### Server & Chat Module
- **Server List**: Discord-style server sidebar with icons
- **Channel List**: Text channels within selected server
- **Chat Dashboard**: Real-time messaging with:
  - Message history with infinite scroll
  - Typing indicators
  - Reply functionality
  - File attachments
  - Message edit/delete
- **Server Creation Modal**: Create new servers with name and icon
- **Join Server Modal**: Join via invite code

### Inbox Module
- **Friends Tab**: List of current friends with chat action
- **Requests Tab**: Pending incoming and outgoing requests
- **Search Tab**: User search with add friend functionality

### Materials Module
- **Folder Navigation**: Hierarchical folder structure
- **File List**: Display files with icons by type
- **Download**: Single file or bulk ZIP download

### Josephine AI Module
- **Chat List**: Previous AI conversations
- **Chat Interface**: Message bubbles with markdown support
- **File Upload**: Attach files for AI analysis

### Profile Module
- **User Info**: Avatar, name, email, role display
- **Academic Info**: Course, semester, year (for students)
- **Settings**: App preferences and logout

---

## ⚙️ Backend Modules

### Auth Module (`auth.controller.js`)
- User registration with password hashing (bcrypt)
- Login with JWT token generation
- OTP generation and verification
- Password reset flow
- Google OAuth integration
- Session management with device tracking
- Account lockout after failed attempts

### Server Module (`server.controller.js`)
- Server CRUD operations
- Channel management
- Message handling with pagination
- Invite code generation with expiration
- Member management
- File attachment processing via S3

### Inbox Module (`inbox.controller.js`)
- Friend list management
- Friend request workflow
- User search functionality
- Request acceptance/rejection

### Materials Module (`materials.controller.js`)
- File upload to AWS S3
- Folder creation and management
- File download (single and bulk)
- Copy/move operations
- Delete with S3 cleanup

### Josephine Module (`josephine.controller.js`)
- Chat session management
- Anthropic Claude API integration
- Message history persistence
- File analysis capability
- Chat modification (star, rename)

### Socket Module (`sockets/`)
- User registration and presence
- Channel join/leave events
- Real-time message broadcast
- Typing indicator events
- Friend request notifications
- File upload progress tracking

---

## 🔌 Real-Time Features

### Socket.IO Events

#### Client → Server Events
| Event | Payload | Description |
|-------|---------|-------------|
| `register-user` | `userId` | Register user for events |
| `deregister-user` | `userId` | Unregister user |
| `join-channel` | `channelId` | Join a channel room |
| `leave-channel` | `channelId, userId` | Leave a channel room |
| `typing` | `channelId, userId, userName` | Send typing indicator |
| `send-message` | `attachmentsLength, metadata, content, replyId, tempMsgId` | Send a message |

#### Server → Client Events
| Event | Payload | Description |
|-------|---------|-------------|
| `receive-message` | `message, tempMsgId` | New message received |
| `typing-indicator` | `indicator` | User is typing |
| `new-member-joined` | `serverId, user` | New server member |
| `friend-request-received` | `request` | New friend request |
| `request-accepted` | `friendship` | Friend request accepted |

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v20.x LTS or higher
- **npm** v10.x or higher
- **MongoDB** v7.x (local or Atlas)
- **Redis** v7.x (local or cloud)
- **Expo CLI** (`npm install -g expo-cli`)
- **AWS Account** (for S3 storage)
- **Anthropic API Key** (for Josephine AI)

### 1. Clone Repository

```bash
git clone https://github.com/noturbob/josh-net-app.git
cd josh-net-app
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration (see Environment Variables section)
nano .env

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Update API configuration
# Edit src/config/api.config.ts with your backend URL

# Start Expo development server
npx expo start --clear
```

---

## 🔐 Environment Variables

### Backend `.env` File

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/joshnet
# Or MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/joshnet

# Redis Connection
REDIS_URL=redis://localhost:6379
# Or Redis Cloud: redis://user:pass@host:port

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=joshnet-materials

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Anthropic AI (Claude)
ANTHROPIC_API_KEY=sk-ant-api-your-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/v1/auth/google/callback

# College Portal (for scraping)
COLLEGE_PORTAL_URL=https://portal.josephscollege.ac.in
```

### Frontend Configuration

Edit `src/config/api.config.ts`:

```typescript
// Development
export const API_BASE_URL = 'http://192.168.1.100:8080';  // Your local IP

// Production
export const API_BASE_URL = 'https://api.joshnet.app';
```

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npx expo start --clear
```

### Running on Devices

- **iOS Simulator**: Press `i` in Expo CLI
- **Android Emulator**: Press `a` in Expo CLI
- **Physical Device**: Scan QR code with Expo Go app

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npx expo build:android  # For Android APK
npx expo build:ios      # For iOS IPA
# Or use EAS Build
eas build --platform all
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm run test:models
npm run test:controllers
npm run test:middleware

# Watch mode
npm run test:watch
```

### Test Structure

```
tests/
├── unit/
│   ├── models/
│   ├── controllers/
│   └── middleware/
├── integration/
└── setup/
    └── setupTests.js
```

---

## 🗺 Future Roadmap

### Version 3.1 (Q2 2026)
- [ ] Voice channels with WebRTC
- [ ] Push notifications
- [ ] Dark/Light theme toggle
- [ ] Message search functionality

### Version 3.2 (Q3 2026)
- [ ] Faculty module completion
- [ ] Attendance marking via QR code
- [ ] Internal marks management
- [ ] Timetable integration

### Version 3.3 (Q4 2026)
- [ ] Alumni networking features
- [ ] Mentorship program
- [ ] Job/internship postings
- [ ] Event management

### Version 4.0 (2027)
- [ ] Admin dashboard web portal
- [ ] Analytics and reporting
- [ ] Multi-institution support
- [ ] API marketplace

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/whyismeleige">
        <img src="https://github.com/whyismeleige.png" width="100px;" alt="Piyush"/><br />
        <sub><b>Piyush</b></sub>
      </a><br />
      <sub>@whyismeleige</sub><br />
      <sub>Backend Development</sub>
    </td>
    <td align="center">
      <a href="https://github.com/noturbob">
        <img src="https://github.com/noturbob.png" width="100px;" alt="Bobby"/><br />
        <sub><b>Bobby</b></sub>
      </a><br />
      <sub>@noturbob</sub><br />
      <sub>Full Stack Development</sub>
    </td>
    <td align="center">
      <a href="https://github.com/vyshnavi0907">
        <img src="https://github.com/vyshnavi0907.png" width="100px;" alt="Vyshnavi"/><br />
        <sub><b>Vyshnavi</b></sub>
      </a><br />
      <sub>@vyshnavi0907</sub><br />
      <sub>Frontend Development</sub>
    </td>
  </tr>
</table>

---

## 🎓 Academic Context

### Project Information

| Field | Details |
|-------|---------|
| **Project Title** | JoshNet - Campus Ecosystem Platform |
| **Course** | BBA IT (Bachelor of Business Administration in Information Technology) |
| **Institution** | St. Joseph's Degree & PG College, Hyderabad |
| **Academic Year** | 2025-2026 |
| **Project Type** | Final Year Project |
| **Guided By** | Department of Computer Science |

### Project Objectives

1. **Unify Campus Communication** - Replace fragmented tools with a single platform
2. **Enhance Academic Access** - Easy access to materials, attendance, and grades
3. **Leverage AI Technology** - Integrate AI assistant for student support
4. **Enable Real-time Collaboration** - Foster community through instant messaging
5. **Implement Modern Security** - Industry-standard authentication and authorization

### Technologies Learned

- Full-stack JavaScript/TypeScript development
- RESTful API design and implementation
- Real-time communication with WebSockets
- NoSQL database design with MongoDB
- Cloud services integration (AWS S3, Redis)
- Mobile app development with React Native
- AI/ML integration via APIs
- Version control with Git/GitHub

---

## 🙏 Acknowledgments

- **St. Joseph's Degree & PG College** - For providing the opportunity and guidance
- **Faculty Mentors** - For their continuous support and feedback
- **React Native Community** - For excellent documentation and packages
- **Expo Team** - For making mobile development accessible
- **Anthropic** - For the Claude AI API
- **MongoDB & Redis** - For powerful database solutions
- **AWS** - For reliable cloud infrastructure

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 JoshNet Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

Having issues or questions? Reach out to us!

| Channel | Link |
|---------|------|
| 🐛 **Bug Reports** | [GitHub Issues](https://github.com/noturbob/josh-net-app/issues) |
| 💡 **Feature Requests** | [GitHub Issues](https://github.com/noturbob/josh-net-app/issues) |
| 📧 **Email** | 121423408057@josephscollege.ac.in |
| 🏫 **Institution** | [St. Joseph's College](https://josephscollege.ac.in) |

---

<div align="center">
  
  **🎓 JoshNet V3**
  
  *A Final Year Project by BBA IT Students*
  
  *St. Joseph's Degree & PG College, Hyderabad*
  
  ---
  
  **Made with ❤️ for students, by students**
  
  ⭐ Star this repo if you find it helpful!
  
  ---
  
  © 2026 JoshNet Contributors. All rights reserved.

</div>
