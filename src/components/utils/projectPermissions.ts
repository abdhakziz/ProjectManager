// Project-level permissions system

import { Crown, Shield, User } from 'lucide-react';

export type ProjectRole = 'manager' | 'admin' | 'member';

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: ProjectRole;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  team: TeamMember[];
  createdBy: string;
  [key: string]: any;
}

/**
 * Get user's role in a specific project
 */
export const getUserRoleInProject = (project: Project | null, userId: string): ProjectRole | null => {
  if (!project) return null;
  
  const member = project.team.find(m => m.userId === userId);
  return member ? member.role : null;
};

/**
 * Check if user is a manager of the project
 */
export const isProjectManager = (project: Project | null, userId: string): boolean => {
  return getUserRoleInProject(project, userId) === 'manager';
};

/**
 * Check if user is an admin or manager of the project
 */
export const isProjectAdmin = (project: Project | null, userId: string): boolean => {
  const role = getUserRoleInProject(project, userId);
  return role === 'manager' || role === 'admin';
};

/**
 * Check if user has any role in the project
 */
export const isProjectMember = (project: Project | null, userId: string): boolean => {
  return getUserRoleInProject(project, userId) !== null;
};

/**
 * Permission definitions for each role
 */
const projectPermissions = {
  manager: {
    // Project management
    editProject: true,
    deleteProject: true,
    archiveProject: true,
    
    // Team management
    addTeamMember: true,
    removeTeamMember: true,
    changeUserRole: true,
    assignAdmin: true,      // Manager can assign Admin
    assignMember: true,     // Manager can assign Member
    
    // Task management
    createTask: true,
    editAllTasks: true,
    deleteTask: true,
    assignTask: true,
    
    // Document management
    uploadDocument: true,
    deleteDocument: true,
    
    // Reports
    viewReports: true,
    exportReports: true,
    
    // Time tracking
    viewAllTimeEntries: true,
    editAllTimeEntries: true,
  },
  admin: {
    // Project management
    editProject: true,
    deleteProject: false,
    archiveProject: false,
    
    // Team management
    addTeamMember: true,
    removeTeamMember: true,
    changeUserRole: false,   // Admin cannot change roles
    assignAdmin: false,      // Admin cannot assign Admin
    assignMember: true,      // Admin can assign Member
    
    // Task management
    createTask: true,
    editAllTasks: true,
    deleteTask: true,
    assignTask: true,
    
    // Document management
    uploadDocument: true,
    deleteDocument: true,
    
    // Reports
    viewReports: true,
    exportReports: true,
    
    // Time tracking
    viewAllTimeEntries: true,
    editAllTimeEntries: false,
  },
  member: {
    // Project management
    editProject: false,
    deleteProject: false,
    archiveProject: false,
    
    // Team management
    addTeamMember: false,
    removeTeamMember: false,
    changeUserRole: false,
    assignAdmin: false,
    assignMember: false,
    
    // Task management
    createTask: true,
    editAllTasks: false,
    deleteTask: false,
    assignTask: false,
    
    // Document management
    uploadDocument: true,
    deleteDocument: false,
    
    // Reports
    viewReports: true,
    exportReports: false,
    
    // Time tracking
    viewAllTimeEntries: false,
    editAllTimeEntries: false,
  }
};

/**
 * Check if user has a specific permission in the project
 */
export const hasProjectPermission = (
  project: Project | null,
  userId: string,
  permission: keyof typeof projectPermissions.manager
): boolean => {
  const role = getUserRoleInProject(project, userId);
  if (!role) return false;
  
  return projectPermissions[role][permission] || false;
};

/**
 * Get role badge color
 */
export const getRoleBadgeClass = (role: ProjectRole): string => {
  const roleStyles = {
    manager: 'bg-purple-100 text-purple-700 border-purple-200',
    admin: 'bg-blue-100 text-blue-700 border-blue-200',
    member: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  return roleStyles[role];
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (role: ProjectRole): string => {
  const roleNames = {
    manager: 'Manager',
    admin: 'Admin',
    member: 'Member',
  };
  return roleNames[role];
};

/**
 * Get available roles that current user can assign
 */
export const getAssignableRoles = (project: Project | null, userId: string): ProjectRole[] => {
  const userRole = getUserRoleInProject(project, userId);
  
  if (userRole === 'manager') {
    return ['admin', 'member'];
  } else if (userRole === 'admin') {
    return ['member'];
  }
  
  return [];
};

/**
 * Get role icon component (returns JSX element)
 */
export const getRoleIcon = (role: ProjectRole | string) => {
  if (role === 'manager') return Crown;
  if (role === 'admin') return Shield;
  return User;
};