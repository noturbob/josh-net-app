# 🎓 JoshNet

> A next-generation campus ecosystem that brings your entire college community together in one intelligent, role-aware mobile platform.

[![React Native](https://img.shields.io/badge/React%20Native-Expo%2052-blue.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-v4-38bdf8)](https://www.nativewind.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ What is JoshNet?

JoshNet V3 transforms how students, faculty, alumni, and administrators interact on campus. Think of it as Discord meets your student portal—featuring real-time chat, AI-powered assistance, academic tracking, and role-specific tools all wrapped in a beautiful, intuitive interface.

### 🎯 Key Highlights

- **🔐 Role-Based Architecture** - Purpose-built experiences for Students, Faculty, Alumni, and Admins
- **💬 Real-Time Communication** - Discord-inspired channels for classes, committees, and departments  
- **🤖 Josephine AI Assistant** - Your personal campus AI companion
- **📊 Smart Analytics** - Track attendance, grades, and eligibility in real-time
- **📱 Native Performance** - Smooth, responsive experience built with React Native

---

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React Native (Expo SDK 52) |
| **Language** | TypeScript |
| **Styling** | NativeWind v4 (Tailwind CSS 3.4) + clsx + tailwind-merge |
| **Navigation** | React Navigation v6 (Stack, Drawer, Bottom Tabs) |
| **Charts** | React Native Chart Kit |
| **Icons** | Expo Vector Icons (Ionicons, MaterialCommunityIcons) |
| **Architecture** | Feature-Based with Role-Based Access Control (RBAC) |

---

## 📂 Project Structure

```
src/
├── app/                      # Application entry point
├── components/            
│   ├── ui/                   # Reusable primitives (Button, Input, Card)
│   └── shared/               # Complex shared components
├── context/                  # Global state management
│   ├── AuthContext.tsx       # Authentication & role management
│   └── UserContext.tsx       # User profile data
├── features/                 # Feature modules by user role
│   ├── auth/                 # Login, Signup, OTP, Password Reset
│   ├── student/              # Student-specific features
│   │   ├── screens/          # Dashboard, Attendance, Materials
│   │   └── components/       # Student UI components
│   ├── faculty/              # Faculty workspace & tools
│   ├── alumni/               # Alumni networking & mentorship
│   └── admin/                # Administration & analytics
├── lib/                      # Utility functions
│   └── utils.ts              # cn() class merger & helpers
├── navigation/               # Navigation configuration
│   ├── RootNavigator.tsx     # Main routing logic
│   └── CustomDrawer.tsx      # Discord-style sidebar
└── services/                 # API service layer
```

---

## 👥 User Roles & Features

### 🎒 Student Portal

The student experience is designed around community and academic success.

**Features:**
- **Discord-Style Navigation** - Intuitive sidebar with servers for Classes, Committees, and Alumni connections
- **Josephine AI** - Your 24/7 AI assistant for campus questions, homework help, and guidance
- **Materials Repository** - Organized accordion view: Semesters → Subjects → PDFs/Resources
- **Attendance Dashboard** - Visual heatmaps with 75% eligibility calculator and predictions
- **Academic Profile** - Real-time CGPA tracking, attendance stats, and performance insights

### 👨‍🏫 Faculty Workspace

Streamlined tools for educators to focus on teaching, not administration.

**Features:**
- **Smart Attendance** - Quick mark entry with class rosters and analytics
- **Marks Management** - Internal assessment entry (IA1, IA2) with auto-calculation
- **Interactive Timetable** - Day-to-day lecture schedule with room assignments
- **Department Communication** - Dedicated chat rooms for faculty collaboration
- **Class Channels** - Direct communication with student batches

### 🎓 Alumni Network

Stay connected with your alma mater and give back to the community.

**Features:**
- **Batch Connections** - Reconnect with classmates through batch-specific channels
- **Mentorship Program** - Guide current students in their career journey
- **Event Hub** - Alumni meetups, reunions, and fundraising campaigns
- **Career Network** - Job postings and professional networking

### 👔 Admin Dashboard

Powerful oversight and management tools for campus administrators.

**Features:**
- **System Analytics** - Real-time metrics, user activity logs, and engagement stats
- **Global Announcements** - Broadcast important updates to the entire campus
- **User Management** - Verify accounts, manage permissions, and moderate content
- **Feedback Center** - Review and respond to student/faculty feedback

---

## 🔐 Role-Based Access Control (RBAC)

JoshNet uses a "Traffic Cop" navigation strategy to ensure secure, role-appropriate experiences. 

**How it works:**
1. User logs in and receives a role token (`STUDENT`, `FACULTY`, `ALUMNI`, `ADMIN`)
2. `RootNavigator.tsx` acts as a security gateway
3. Role-specific navigator is rendered (e.g., `StudentNavigator`)
4. All screens and features are scoped to that role—no cross-contamination

> **Security Note:** A user logged in as Student cannot access Faculty or Admin screens, even by manipulating routes.

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (LTS version recommended)
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS Simulator** or **Android Emulator** (or use Expo Go on your phone)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/noturbob/josh-net-app.git
   cd josh-net-app/frontend
   ```

2. **Install dependencies**  
   We use `--legacy-peer-deps` to resolve peer dependency conflicts between NativeWind v4 and Tailwind 3.4.
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install Expo modules**
   ```bash
   npx expo install react-native-reanimated react-native-safe-area-context \
     react-native-gesture-handler react-native-screens react-native-svg
   ```

4. **Start the development server**  
   Always use `--clear` to reset the CSS compiler cache.
   ```bash
   npx expo start --clear
   ```

5. **Run on device**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

---

## 🎨 Styling Guide

JoshNet uses a **shadcn-inspired design system** built on NativeWind (Tailwind for React Native).

### The `cn()` Utility

Our secret weapon for dynamic, mergeable class names:

```tsx
import { cn } from '@/lib/utils';

// Base component with overridable styles
function Card({ className, ...props }) {
  return (
    <View 
      className={cn(
        "bg-zinc-900 rounded-xl p-4 shadow-lg",
        className // Allows parent to override
      )}
      {...props}
    />
  );
}

// Usage
<Card className="bg-indigo-500 p-6">
  <Text className="text-white">Custom styled card</Text>
</Card>
```

### Color System

Defined in `tailwind.config.js` for consistent theming:

| Variable | Color | Usage |
|----------|-------|-------|
| `bg-background` | Zinc 950 | Main app background |
| `bg-primary` | Indigo 500 | Primary actions, CTAs |
| `bg-secondary` | Teal 500 | Student role theme |
| `bg-accent` | Amber 500 | Faculty role theme |
| `bg-danger` | Rose 500 | Warnings, admin actions |
| `text-foreground` | Zinc 50 | Primary text |
| `text-muted` | Zinc 400 | Secondary text |

### Component Patterns

```tsx
// ✅ Good - Using utility classes
<Button className="bg-primary text-white px-6 py-3 rounded-lg">
  Submit
</Button>

// ❌ Avoid - Inline styles
<Button style={{ backgroundColor: '#6366f1', padding: 12 }}>
  Submit
</Button>
```

---

## 🧩 Core Components

### `AuthContext.tsx`
Manages authentication state and user roles. Provides `login()`, `logout()`, and `user` object throughout the app.

```tsx
const { user, role, login, logout } = useAuth();
```

### `RootNavigator.tsx`
The main navigation switch. Renders either:
- `AuthNavigator` - Login/Signup screens
- `StudentNavigator` - Student-specific app
- `FacultyNavigator` - Faculty workspace
- `AlumniNavigator` - Alumni network
- `AdminNavigator` - Admin dashboard

### `CustomDrawer.tsx`
Discord-inspired dual-pane sidebar for Students:
- Left pane: Server list (Classes, Committees, Alumni)
- Right pane: Channel list within selected server
- Smooth animations and haptic feedback

---

## 📱 Screenshots

*(Add screenshots here showing Student Dashboard, Faculty Workspace, Alumni Network, and Admin Analytics)*

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Add your feature**
   - Place new screens in `src/features/{role}/screens/`
   - Register screens in the appropriate Navigator
   - Follow existing code patterns and styling conventions
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push and create a Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Guidelines

- Use TypeScript for all new files
- Follow the existing folder structure
- Use the `cn()` utility for className merging
- Add comments for complex logic
- Test on both iOS and Android

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for college campuses everywhere
- Inspired by Discord's excellent UX patterns
- Powered by the amazing Expo and React Native community

---

## 📞 Support

Having issues? We're here to help!

- 🐛 [Report a Bug](https://github.com/noturbob/josh-net-app/issues)
- 💡 [Request a Feature](https://github.com/noturbob/josh-net-app/issues)
- 📧 Email: 121423408057@josephscollege.ac.in

---

<div align="center">
  <strong>Made with 🎓 for students, by students</strong>
  <br>
  <sub>Star ⭐ this repo if you find it helpful!</sub>
</div>