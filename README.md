# Unisynk Frontend

A modern, responsive frontend for the Unisynk event management platform built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features Implemented (Phase 1)

### Public Site & Growth
- ✅ **Homepage** (`/`) - Hero section, features, verticals showcase
- ✅ **Pricing** (`/pricing`) - Tier comparison with Free, Pro, Business, Enterprise plans
- ✅ **Blog** (`/blog`) - Article listing with categories and search
- ✅ **Documentation** (`/docs`) - Organized help sections and popular articles
- ✅ **Referral Program** (`/referral`) - Referral code sharing and stats
- ✅ **Ambassador Program** (`/ambassador`) - Application form and benefits

### Auth & Onboarding
- ✅ **Login** (`/auth/login`) - Email/password authentication
- ✅ **Signup** (`/auth/signup`) - User registration form
- ✅ **Onboarding** (`/onboarding`) - Multi-step org/event setup wizard

### Dashboard
- ✅ **Dashboard Home** (`/dashboard`) - Event overview, stats, quick actions
- ✅ **Navigation** - Responsive header with search, notifications, theme toggle

### Profile & Settings
- ✅ **Profile** (`/profile`) - Personal info, password change, notifications
- ✅ **Organization Settings** (`/dashboard/settings`) - Org details, team management, branding

## 🎨 Design System

### Theme
- **Colors**: Black with purple accents (similar to Supabase)
- **Primary**: Purple (`#8B5CF6`)
- **Dark/Light mode**: Fully supported with theme toggle in footer
- **Typography**: Inter font family

### Components
- Built with **Radix UI** primitives for accessibility
- **ShadCN** component library for consistent styling
- **Lucide React** icons throughout
- Responsive design with mobile-first approach

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: Radix UI + ShadCN
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **State Management**: Zustand (ready for implementation)
- **Package Manager**: pnpm

## 🏗 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── blog/              # Blog pages
│   ├── docs/              # Documentation
│   ├── pricing/           # Pricing page
│   ├── referral/          # Referral program
│   ├── ambassador/        # Ambassador program
│   └── profile/           # User profile
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── navigation.tsx    # Main navigation
│   ├── footer.tsx        # Site footer
│   └── theme-provider.tsx # Theme context
└── lib/                  # Utilities
    └── utils.ts          # Helper functions
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: Tailwind's responsive system
- **Navigation**: Collapsible mobile menu (ready for implementation)
- **Cards**: Responsive grid layouts

## 🎯 Next Steps (Phase 2)

- [ ] Event management pages
- [ ] Attendee management
- [ ] Automation builder UI
- [ ] Integration settings
- [ ] Analytics dashboard
- [ ] Real authentication integration
- [ ] API integration layer
- [ ] Form validation with Zod
- [ ] Toast notifications
- [ ] Loading states

## 🔧 Development

The app uses:
- **Hot reload** for instant development feedback
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS** for rapid styling

## 🌟 Key Features

- **Theme Toggle**: Dark/light mode in footer (Supabase-style)
- **Accessibility**: Built with Radix UI for screen reader support
- **Performance**: Next.js 16 with Turbopack for fast builds
- **SEO Ready**: Proper meta tags and semantic HTML
- **Responsive**: Works on all device sizes

The frontend is now ready for Phase 2 development and backend integration!