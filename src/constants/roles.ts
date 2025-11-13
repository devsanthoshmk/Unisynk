/**
 * User Roles and Permissions Constants
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  ORGANIZER: 'organizer', 
  MEMBER: 'member',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  organizer: 'Event Organizer',
  member: 'Team Member',
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Full access to all features and settings',
  organizer: 'Can create and manage events for their organization',
  member: 'Can assist with event management tasks',
}

// Permission definitions
export const PERMISSIONS = {
  // Organization permissions
  MANAGE_ORGANIZATION: 'manage_organization',
  VIEW_ORGANIZATION: 'view_organization',
  INVITE_MEMBERS: 'invite_members',
  
  // Event permissions
  CREATE_EVENTS: 'create_events',
  EDIT_EVENTS: 'edit_events',
  DELETE_EVENTS: 'delete_events',
  VIEW_EVENTS: 'view_events',
  PUBLISH_EVENTS: 'publish_events',
  
  // Registration permissions
  MANAGE_REGISTRATIONS: 'manage_registrations',
  VIEW_REGISTRATIONS: 'view_registrations',
  EXPORT_REGISTRATIONS: 'export_registrations',
  
  // Microsite permissions
  MANAGE_MICROSITE: 'manage_microsite',
  PUBLISH_MICROSITE: 'publish_microsite',
  
  // Analytics permissions
  VIEW_ANALYTICS: 'view_analytics',
  EXPORT_ANALYTICS: 'export_analytics',
  
  // System permissions
  MANAGE_BILLING: 'manage_billing',
  MANAGE_INTEGRATIONS: 'manage_integrations',
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: Object.values(PERMISSIONS),
  organizer: [
    PERMISSIONS.VIEW_ORGANIZATION,
    PERMISSIONS.INVITE_MEMBERS,
    PERMISSIONS.CREATE_EVENTS,
    PERMISSIONS.EDIT_EVENTS,
    PERMISSIONS.DELETE_EVENTS,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.PUBLISH_EVENTS,
    PERMISSIONS.MANAGE_REGISTRATIONS,
    PERMISSIONS.VIEW_REGISTRATIONS,
    PERMISSIONS.EXPORT_REGISTRATIONS,
    PERMISSIONS.MANAGE_MICROSITE,
    PERMISSIONS.PUBLISH_MICROSITE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_ANALYTICS,
    PERMISSIONS.MANAGE_INTEGRATIONS,
  ],
  member: [
    PERMISSIONS.VIEW_ORGANIZATION,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.VIEW_REGISTRATIONS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
}

// Utility functions
export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[userRole].includes(permission)
}

export const canAccessRoute = (userRole: UserRole, route: string): boolean => {
  const routePermissions: Record<string, Permission> = {
    '/dashboard/events/new': PERMISSIONS.CREATE_EVENTS,
    '/dashboard/events/[id]/edit': PERMISSIONS.EDIT_EVENTS,
    '/dashboard/events/[id]/microsite': PERMISSIONS.MANAGE_MICROSITE,
    '/dashboard/analytics': PERMISSIONS.VIEW_ANALYTICS,
    '/dashboard/settings': PERMISSIONS.MANAGE_ORGANIZATION,
  }
  
  const requiredPermission = routePermissions[route]
  return requiredPermission ? hasPermission(userRole, requiredPermission) : true
}

export const getAvailableRoles = (currentUserRole: UserRole): UserRole[] => {
  switch (currentUserRole) {
    case 'admin':
      return [USER_ROLES.ADMIN, USER_ROLES.ORGANIZER, USER_ROLES.MEMBER]
    case 'organizer':
      return [USER_ROLES.ORGANIZER, USER_ROLES.MEMBER]
    case 'member':
      return [USER_ROLES.MEMBER]
    default:
      return []
  }
}