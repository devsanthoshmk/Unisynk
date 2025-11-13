# Registration & Microsite Module

This module provides a complete solution for event microsites and registration management in Unisynk.

## 🌐 Public Microsite Features

### Event Landing Page (`/events/[slug]`)
- **Hero Section**: Event branding, date, venue, and CTA
- **About Section**: Event description, speakers, and agenda
- **Live Announcements**: Real-time updates and notifications
- **Registration CTA**: Prominent call-to-action for registration
- **Certificate Portal**: Token/email-based certificate downloads
- **Help & Support**: FAQ, contact forms, and organizer details

### Key Components
- `MicrositeHero`: Hero banner with event details
- `AboutSection`: Event information and speaker cards
- `RegistrationCTA`: Sticky registration call-to-action
- `LiveAnnouncements`: Dismissible announcement banners
- `CertificatePortal`: Certificate download interface
- `HelpSupport`: FAQ and contact forms

## 📝 Registration System

### Registration Flow (`/events/[slug]/register`)
- **Token Gate**: Optional access control with tokens/invites
- **Dynamic Forms**: Custom fields with validation
- **Team Registration**: Multi-member team signup
- **Progress Tracking**: Step-by-step progress indication
- **Confirmation**: Success screen with ticket download

### Key Components
- `RegistrationFlow`: Main flow orchestrator
- `TokenGate`: Access control component
- `RegistrationForm`: Dynamic form renderer
- `ConfirmationScreen`: Success and next steps

## 🛠️ Form Builder

### Form Builder Interface (`/dashboard/events/[id]/form`)
- **Field Palette**: Drag-and-drop field types
- **Visual Editor**: Real-time form building
- **Field Configuration**: Properties and validation
- **Form Settings**: Access control and team options
- **Live Preview**: Test form as attendees see it

### Key Components
- `FormBuilder`: Main builder interface
- `FieldPalette`: Available field types
- `FieldEditor`: Field property editor
- `FormSettings`: Global form configuration
- `FormPreview`: Live form preview

## 🎨 Field Types Supported

- **Text Input**: Single-line text
- **Email**: Email with validation
- **Phone**: Phone number input
- **Dropdown**: Select with options
- **Checkbox**: Boolean input
- **Text Area**: Multi-line text
- **File Upload**: File attachment

## ⚙️ Configuration Options

### Form Settings
- **Token Required**: Restrict access with tokens
- **Team Registration**: Enable group signup
- **Max Team Size**: Limit team members (2-10)
- **Redirect URL**: Post-registration redirect
- **Confirmation Message**: Custom success message

### Field Properties
- **Label**: Display name
- **Placeholder**: Helper text
- **Required**: Validation requirement
- **Options**: For dropdown fields

## 🔧 Technical Implementation

### File Structure
```
app/
├── events/[slug]/
│   ├── page.tsx              # Microsite landing
│   └── register/
│       └── page.tsx          # Registration form
├── dashboard/events/[id]/
│   └── form/
│       ├── page.tsx          # Form builder
│       └── preview/
│           └── page.tsx      # Form preview
└── api/
    └── events/
        ├── [slug]/register/  # Registration API
        └── [id]/form/        # Form management API

components/
├── microsite/
│   ├── microsite-hero.tsx
│   ├── about-section.tsx
│   ├── registration-cta.tsx
│   ├── live-announcements.tsx
│   ├── certificate-portal.tsx
│   └── help-support.tsx
├── registration/
│   ├── registration-flow.tsx
│   ├── token-gate.tsx
│   ├── registration-form.tsx
│   └── confirmation-screen.tsx
└── form-builder/
    ├── form-builder.tsx
    ├── field-palette.tsx
    ├── field-editor.tsx
    ├── form-settings.tsx
    ├── form-preview.tsx
    └── registration-form-preview.tsx
```

### Dependencies
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **Radix UI**: Accessible components
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## 🚀 Usage Examples

### Creating a New Event Form
1. Navigate to `/dashboard/events/[id]/form`
2. Add fields from the palette
3. Configure field properties
4. Set form settings (tokens, teams, etc.)
5. Preview and publish

### Registering for an Event
1. Visit `/events/[slug]`
2. Click "Register Now"
3. Enter token (if required)
4. Fill registration form
5. Add team members (if enabled)
6. Complete registration

### Downloading Certificates
1. Visit event microsite
2. Scroll to Certificate Portal
3. Enter email or token
4. Download certificate

## 🎯 UX Features

- **Mobile-first**: Responsive design
- **Accessibility**: WCAG compliant
- **Progressive Enhancement**: Works without JS
- **Auto-save**: Form progress preservation
- **Real-time Validation**: Instant feedback
- **SEO Optimized**: Meta tags and structured data

## 🔮 Future Enhancements

- **Conditional Logic**: Show/hide fields based on responses
- **Payment Integration**: Paid event registration
- **QR Code Generation**: Check-in codes
- **Email Templates**: Custom confirmation emails
- **Analytics**: Registration funnel tracking
- **Multi-language**: i18n support