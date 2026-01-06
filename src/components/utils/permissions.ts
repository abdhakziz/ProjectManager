/**
 * Role-Based Access Control (RBAC) System
 * 
 * Definisi hak akses untuk setiap role di semua modul
 */

export type UserRole = 'admin' | 'manager' | 'member';

export type Permission = 
  // Dashboard
  | 'view_dashboard'
  | 'view_all_stats'
  | 'view_team_stats'
  | 'view_own_stats'
  
  // Projects
  | 'view_all_projects'
  | 'view_assigned_projects'
  | 'create_project'
  | 'edit_all_projects'
  | 'edit_own_projects'
  | 'delete_project'
  | 'archive_project'
  
  // Tasks
  | 'view_all_tasks'
  | 'view_assigned_tasks'
  | 'create_task'
  | 'assign_task'
  | 'edit_all_tasks'
  | 'edit_assigned_tasks'
  | 'delete_task'
  | 'change_task_status'
  
  // Calendar
  | 'view_calendar'
  | 'view_all_events'
  | 'view_own_events'
  | 'create_event'
  | 'edit_all_events'
  | 'edit_own_events'
  | 'delete_event'
  
  // Team Management
  | 'view_all_team'
  | 'view_team_members'
  | 'invite_member'
  | 'edit_member'
  | 'remove_member'
  | 'change_roles'
  | 'view_member_performance'
  
  // Reports
  | 'view_all_reports'
  | 'view_team_reports'
  | 'view_own_reports'
  | 'export_reports'
  | 'create_custom_reports'
  
  // Time Tracking
  | 'view_all_time_entries'
  | 'view_team_time_entries'
  | 'view_own_time_entries'
  | 'create_time_entry'
  | 'edit_all_time_entries'
  | 'edit_own_time_entries'
  | 'delete_time_entry'
  | 'approve_time_entries'
  
  // Documents
  | 'view_all_documents'
  | 'view_project_documents'
  | 'upload_document'
  | 'edit_document'
  | 'delete_all_documents'
  | 'delete_own_documents'
  | 'manage_document_versions'
  
  // Notifications
  | 'view_notifications'
  | 'manage_notification_settings'
  | 'send_announcements'
  
  // Settings
  | 'view_settings'
  | 'edit_system_settings'
  | 'edit_own_settings'
  | 'manage_integrations'
  | 'view_audit_logs';

/**
 * Role Permissions Matrix
 * Definisi lengkap permission untuk setiap role
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // Dashboard - Full access
    'view_dashboard',
    'view_all_stats',
    'view_team_stats',
    'view_own_stats',
    
    // Projects - Full access
    'view_all_projects',
    'view_assigned_projects',
    'create_project',
    'edit_all_projects',
    'edit_own_projects',
    'delete_project',
    'archive_project',
    
    // Tasks - Full access
    'view_all_tasks',
    'view_assigned_tasks',
    'create_task',
    'assign_task',
    'edit_all_tasks',
    'edit_assigned_tasks',
    'delete_task',
    'change_task_status',
    
    // Calendar - Full access
    'view_calendar',
    'view_all_events',
    'view_own_events',
    'create_event',
    'edit_all_events',
    'edit_own_events',
    'delete_event',
    
    // Team - Full access
    'view_all_team',
    'view_team_members',
    'invite_member',
    'edit_member',
    'remove_member',
    'change_roles',
    'view_member_performance',
    
    // Reports - Full access
    'view_all_reports',
    'view_team_reports',
    'view_own_reports',
    'export_reports',
    'create_custom_reports',
    
    // Time Tracking - Full access
    'view_all_time_entries',
    'view_team_time_entries',
    'view_own_time_entries',
    'create_time_entry',
    'edit_all_time_entries',
    'edit_own_time_entries',
    'delete_time_entry',
    'approve_time_entries',
    
    // Documents - Full access
    'view_all_documents',
    'view_project_documents',
    'upload_document',
    'edit_document',
    'delete_all_documents',
    'delete_own_documents',
    'manage_document_versions',
    
    // Notifications - Full access
    'view_notifications',
    'manage_notification_settings',
    'send_announcements',
    
    // Settings - Full access
    'view_settings',
    'edit_system_settings',
    'edit_own_settings',
    'manage_integrations',
    'view_audit_logs',
  ],
  
  manager: [
    // Dashboard - Team stats
    'view_dashboard',
    'view_team_stats',
    'view_own_stats',
    
    // Projects - Manage own projects
    'view_all_projects',
    'view_assigned_projects',
    'create_project',
    'edit_own_projects',
    'archive_project',
    
    // Tasks - Manage team tasks
    'view_all_tasks',
    'view_assigned_tasks',
    'create_task',
    'assign_task',
    'edit_assigned_tasks',
    'change_task_status',
    
    // Calendar - Team calendar
    'view_calendar',
    'view_all_events',
    'view_own_events',
    'create_event',
    'edit_own_events',
    
    // Team - Manage team members
    'view_all_team',
    'view_team_members',
    'invite_member',
    'view_member_performance',
    
    // Reports - Team reports
    'view_team_reports',
    'view_own_reports',
    'export_reports',
    'create_custom_reports',
    
    // Time Tracking - Approve team entries
    'view_team_time_entries',
    'view_own_time_entries',
    'create_time_entry',
    'edit_own_time_entries',
    'approve_time_entries',
    
    // Documents - Project documents
    'view_all_documents',
    'view_project_documents',
    'upload_document',
    'edit_document',
    'delete_own_documents',
    'manage_document_versions',
    
    // Notifications
    'view_notifications',
    'manage_notification_settings',
    
    // Settings - Own settings only
    'view_settings',
    'edit_own_settings',
  ],
  
  member: [
    // Dashboard - Own stats only
    'view_dashboard',
    'view_own_stats',
    
    // Projects - View assigned projects
    'view_assigned_projects',
    
    // Tasks - Manage own tasks
    'view_assigned_tasks',
    'change_task_status',
    
    // Calendar - Own calendar
    'view_calendar',
    'view_own_events',
    
    // Team - View team members
    'view_team_members',
    
    // Reports - Own reports
    'view_own_reports',
    
    // Time Tracking - Own entries
    'view_own_time_entries',
    'create_time_entry',
    'edit_own_time_entries',
    
    // Documents - View and upload
    'view_project_documents',
    'upload_document',
    'delete_own_documents',
    
    // Notifications
    'view_notifications',
    'manage_notification_settings',
    
    // Settings - Own settings only
    'view_settings',
    'edit_own_settings',
  ],
};

/**
 * Module Access Configuration
 * Definisi modul mana yang bisa diakses oleh setiap role
 */
export const MODULE_ACCESS: Record<UserRole, string[]> = {
  admin: [
    'dashboard',
    'projects',
    'tasks',
    'calendar',
    'team',
    'reports',
    'time-tracking',
    'documents',
    'notifications',
    'settings',
  ],
  manager: [
    'dashboard',
    'projects',
    'tasks',
    'calendar',
    'team',
    'reports',
    'time-tracking',
    'documents',
    'notifications',
    'settings',
  ],
  member: [
    'dashboard',
    'tasks',
    'calendar',
    'team',
    'time-tracking',
    'documents',
    'notifications',
    'settings',
  ],
};

/**
 * Check if user has specific permission
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

/**
 * Check if user can access a module
 */
export function canAccessModule(userRole: UserRole, moduleName: string): boolean {
  return MODULE_ACCESS[userRole]?.includes(moduleName) || false;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(userRole: UserRole): Permission[] {
  return ROLE_PERMISSIONS[userRole] || [];
}

/**
 * Get accessible modules for a role
 */
export function getAccessibleModules(userRole: UserRole): string[] {
  return MODULE_ACCESS[userRole] || [];
}

/**
 * Role Display Names
 */
export const ROLE_NAMES: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  member: 'Team Member',
};

/**
 * Role Descriptions
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Full system access - dapat mengelola semua proyek, tim, dan pengaturan sistem',
  manager: 'Manage tim dan proyek - dapat mengelola proyek dan tim yang ditugaskan',
  member: 'Akses terbatas - dapat melihat dan mengelola tugas yang ditugaskan',
};
