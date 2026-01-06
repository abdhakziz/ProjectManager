/**
 * Mock API untuk integrasi dengan backend Laravel
 * 
 * Ganti fungsi-fungsi ini dengan fetch ke endpoint Laravel API Anda
 * Contoh: fetch('http://localhost:8000/api/projects')
 */

const API_BASE_URL = 'http://localhost:8000/api'; // Ubah sesuai URL Laravel API Anda

export const mockApi = {
  // ============ AUTHENTICATION ============
  login: async (email: string, password: string) => {
    // TODO: Ganti dengan fetch ke Laravel API endpoint
    // return fetch(`${API_BASE_URL}/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // }).then(res => res.json());
    
    // Mock implementation
    return Promise.resolve({ 
      success: true, 
      user: { id: 1, name: 'User', email, role: 'admin' },
      token: 'mock-token-12345'
    });
  },

  // ============ PROJECTS ============
  getProjects: async () => {
    // TODO: return fetch(`${API_BASE_URL}/projects`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json' 
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  createProject: async (projectData: any) => {
    // TODO: return fetch(`${API_BASE_URL}/projects`, {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(projectData)
    // }).then(res => res.json());
    return Promise.resolve({ success: true, data: projectData });
  },

  updateProject: async (id: number, projectData: any) => {
    // TODO: return fetch(`${API_BASE_URL}/projects/${id}`, {
    //   method: 'PUT',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(projectData)
    // }).then(res => res.json());
    return Promise.resolve({ success: true, data: projectData });
  },

  deleteProject: async (id: number) => {
    // TODO: return fetch(`${API_BASE_URL}/projects/${id}`, {
    //   method: 'DELETE',
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve({ success: true });
  },

  // ============ TASKS ============
  getTasks: async () => {
    // TODO: return fetch(`${API_BASE_URL}/tasks`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  createTask: async (taskData: any) => {
    return Promise.resolve({ success: true, data: taskData });
  },

  updateTask: async (id: number, taskData: any) => {
    return Promise.resolve({ success: true, data: taskData });
  },

  deleteTask: async (id: number) => {
    return Promise.resolve({ success: true });
  },

  // ============ TEAM MEMBERS ============
  getTeamMembers: async () => {
    // TODO: return fetch(`${API_BASE_URL}/team`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  createTeamMember: async (memberData: any) => {
    return Promise.resolve({ success: true, data: memberData });
  },

  updateTeamMember: async (id: number, memberData: any) => {
    return Promise.resolve({ success: true, data: memberData });
  },

  deleteTeamMember: async (id: number) => {
    return Promise.resolve({ success: true });
  },

  // ============ TIME TRACKING ============
  getTimeEntries: async () => {
    // TODO: return fetch(`${API_BASE_URL}/time-entries`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  createTimeEntry: async (entryData: any) => {
    return Promise.resolve({ success: true, data: entryData });
  },

  // ============ DOCUMENTS ============
  getDocuments: async () => {
    // TODO: return fetch(`${API_BASE_URL}/documents`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  uploadDocument: async (file: File, metadata: any) => {
    // TODO: Implement file upload to Laravel
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('metadata', JSON.stringify(metadata));
    // return fetch(`${API_BASE_URL}/documents/upload`, {
    //   method: 'POST',
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   },
    //   body: formData
    // }).then(res => res.json());
    return Promise.resolve({ success: true, file: { name: file.name } });
  },

  deleteDocument: async (id: number) => {
    return Promise.resolve({ success: true });
  },

  // ============ NOTIFICATIONS ============
  getNotifications: async () => {
    // TODO: return fetch(`${API_BASE_URL}/notifications`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  markNotificationAsRead: async (id: number) => {
    return Promise.resolve({ success: true });
  },

  // ============ COMMENTS ============
  getComments: async (taskId: number) => {
    // TODO: return fetch(`${API_BASE_URL}/tasks/${taskId}/comments`, {
    //   headers: { 
    //     'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    //     'Accept': 'application/json'
    //   }
    // }).then(res => res.json());
    return Promise.resolve([]);
  },

  createComment: async (taskId: number, comment: string) => {
    return Promise.resolve({ success: true, data: { comment } });
  }
};

export default mockApi;