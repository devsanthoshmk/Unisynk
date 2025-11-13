// Microsite Utilities

export function generateEmbedCode(
  eventSlug: string,
  widgetType: string,
  config: {
    width?: string
    height?: string
    theme?: string
    language?: string
  },
  type: 'iframe' | 'script' = 'iframe'
): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://unisynk.com' 
    : 'http://localhost:3000'
  
  const widgetUrl = `${baseUrl}/embed/${eventSlug}/${widgetType}`
  const params = new URLSearchParams({
    theme: config.theme || 'light',
    lang: config.language || 'en'
  })

  if (type === 'iframe') {
    return `<iframe 
  src="${widgetUrl}?${params.toString()}"
  width="${config.width || '100%'}"
  height="${config.height || '600px'}"
  frameborder="0"
  scrolling="auto">
</iframe>`
  } else {
    return `<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${baseUrl}/embed/widget.js';
    script.setAttribute('data-widget', '${widgetType}');
    script.setAttribute('data-event', '${eventSlug}');
    script.setAttribute('data-theme', '${config.theme}');
    script.setAttribute('data-width', '${config.width}');
    script.setAttribute('data-height', '${config.height}');
    document.head.appendChild(script);
  })();
</script>`
  }
}

export function validateMicrositeSettings(settings: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!settings.mode) {
    errors.push('Microsite mode is required')
  }

  if (settings.mode === 'template') {
    if (!settings.theme) {
      errors.push('Theme selection is required for template mode')
    }
    
    if (!settings.branding?.primaryColor) {
      errors.push('Primary color is required')
    }
    
    if (!settings.sections || settings.sections.length === 0) {
      errors.push('At least one section must be enabled')
    }
  }

  if (settings.mode === 'embed') {
    if (!settings.widgets || settings.widgets.filter((w: any) => w.enabled).length === 0) {
      errors.push('At least one widget must be enabled for embed mode')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function generateMicrositeUrl(eventSlug: string, customDomain?: string): string {
  if (customDomain) {
    return `https://${customDomain}`
  }
  
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://unisynk.com' 
    : 'http://localhost:3000'
  
  return `${baseUrl}/events/${eventSlug}`
}

export function extractColorsFromTheme(themeId: string) {
  const themes: Record<string, any> = {
    college: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b'
    },
    corporate: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#3b82f6'
    },
    creative: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#f59e0b'
    },
    minimal: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#3b82f6'
    },
    nonprofit: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#f59e0b'
    }
  }
  
  return themes[themeId] || themes.college
}

export function sanitizeCustomHTML(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

export function generateSEOMetadata(settings: any, eventData: any) {
  return {
    title: settings.seoSettings?.title || `${eventData.name} - Register Now`,
    description: settings.seoSettings?.description || eventData.description,
    keywords: settings.seoSettings?.keywords || [],
    ogImage: eventData.bannerImage || settings.branding?.logo,
    canonicalUrl: generateMicrositeUrl(eventData.slug, settings.customDomain)
  }
}