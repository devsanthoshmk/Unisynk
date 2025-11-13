# Unisynk

**A smart event management and collaboration platform** designed for agencies, teams, and creators. Streamline projects, clients, tasks, and automation all in one unified dashboard.

---

## Frontend Application

A modern, responsive frontend built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Quick Start

### Local Development

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## ✨ Features

- **Next.js 16 App Router** - Modern routing with server components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI + ShadCN** - Accessible component library
- **Supabase Auth** - Authentication ready
- **Modular Architecture** - Clean, scalable structure
- **Dark/Light Mode** - Theme toggle with next-themes
- **Responsive Design** - Mobile-first approach

---

## 📁 Project Structure

```
src/
├── app/             # Next.js pages (routes)
├── components/      # Shared UI components
│   ├── ui/         # Base design system
│   ├── buttons/    # Button components
│   ├── forms/      # Form components
│   └── providers/  # Context providers
├── layout/          # Layout primitives
│   ├── navigation/ # Navigation components
│   └── wrappers/   # Auth/Role guards
├── modules/         # Feature modules
│   ├── auth/       # Authentication
│   ├── dashboard/  # Dashboard features
│   ├── onboarding/ # Onboarding flow
│   └── microsite/  # Microsite builder
├── lib/             # Core utilities & services
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
└── styles/          # Global CSS
```

---

## 🏗 Architecture

This project follows **clean architecture principles** with:

- **Feature-based modules** - Self-contained business logic
- **Separation of concerns** - Routes, modules, components, layout
- **Strategic barrel exports** - Optimized for tree-shaking
- **Kebab-case naming** - Consistent file naming convention

See `documents/adr/` for detailed architecture decisions.

---

## 🎨 Design System

- **Colors**: Black with purple accents (Supabase-inspired)
- **Primary**: Purple (`#8B5CF6`)
- **Typography**: Inter font family
- **Icons**: Lucide React
- **Components**: Radix UI primitives + custom styling

---

## 📚 Documentation

- **[Architecture Guide](./documents/general/ARCHITECTURE.md)** - Complete structure overview
- **[Quick Reference](./documents/general/QUICK-REFERENCE.md)** - Import patterns & examples
- **[ADRs](./documents/adr/)** - Architecture decision records

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Radix UI + ShadCN |
| State Management | Zustand |
| Icons | Lucide React |
| Backend | Supabase |
| Package Manager | pnpm |

---

## � Dev elopment Guidelines

### Naming Convention
- **Files/Folders**: `kebab-case` (e.g., `auth-layout.tsx`)
- **Components**: `PascalCase` exports (e.g., `export function AuthLayout()`)
- **Hooks**: `camelCase` exports (e.g., `export function useAuth()`)

### Import Patterns
```typescript
// UI Components (direct imports)
import { Button } from '@/components/ui/button'

// Layout Components
import { DashboardLayout } from '@/layout'
import { Sidebar, TopNav } from '@/layout/navigation'

// Modules (named exports)
import { AuthLayout } from '@/modules/auth'
import { MicrositeBuilder } from '@/modules/microsite'

// Hooks
import { useApi, useDebounce } from '@/hooks'
```

---

## 🚀 Deployment

The frontend is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

---

## 🤝 Contributing

1. Follow the established architecture patterns
2. Use kebab-case for all files
3. Add types for all components
4. Document complex logic
5. Test before committing

---

## 📄 License

This project is part of the Mergex platform.

---

**Built with ❤️ by the Mergex team**
