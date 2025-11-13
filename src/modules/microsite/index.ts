// Microsite Module - Named Entry Points Only
// Public API exports for external use

// Management Components
export { MicrositeSetup } from './components/management/microsite-setup'
export { TemplateEditor } from './components/management/template-editor'
export { MicrositePreview } from './components/management/microsite-preview'
export { EmbedWidgetGenerator } from './components/management/embed-widget-generator'
export { CustomSiteRequest } from './components/management/custom-site-request'

// Public Components
export { MicrositeHero } from './components/public/microsite-hero'
export { AboutSection } from './components/public/about-section'
export { RegistrationCTA } from './components/public/registration-cta'
export { LiveAnnouncements } from './components/public/live-announcements'
export { CertificatePortal } from './components/public/certificate-portal'
export { HelpSupport } from './components/public/help-support'

// Shared Components
export { ThemeSelector } from './components/shared/theme-selector'
export { SectionManager } from './components/shared/section-manager'
export { BrandingPanel } from './components/shared/branding-panel'

// Types (type-only exports)
export type {
  MicrositeSettings,
  MicrositeTheme,
  MicrositeSection,
  MicrositeBranding,
  MicrositeMode
} from './types'