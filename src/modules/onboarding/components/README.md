# Onboarding Flow

## Overview
Multi-step onboarding flow with progress bar and skip options using Radix UI, React Hook Form, and Zod validation.

## Steps
1. **User Setup** - Profile creation with live preview
2. **Organization Setup** - Organization details with slug validation  
3. **Event Intent** - Event type and goals selection
4. **Feature Preferences** - Module and integration selection
5. **Tailored Setup** - Workspace generation with progress animation

## Features
- ✅ Progress bar with step navigation
- ✅ Form validation with error handling
- ✅ Skip options for optional steps
- ✅ Live previews and dynamic content
- ✅ Responsive design with Tailwind CSS
- ✅ State management with Zustand
- ✅ Persistent data across sessions

## Components
- `OnboardingFlow` - Main flow controller
- `OnboardingLayout` - Layout with progress bar
- `StepCard` - Reusable step wrapper
- Individual step components in `/steps/`

## Usage
Navigate to `/onboarding` after authentication to start the flow.