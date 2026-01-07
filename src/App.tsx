import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainLayout from './components/MainLayout';

// Mock projects data
export const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign company website with modern UI/UX',
    status: 'active',
    progress: 65,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    color: 'bg-blue-500',
    team: [
      { userId: 'user1', name: 'John Doe', email: 'user@example.com', role: 'manager' },
      { userId: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
      { userId: 'user3', name: 'Mike Johnson', email: 'mike@example.com', role: 'member' },
    ],
    tasks: 24,
    completedTasks: 16,
    createdBy: 'user1',
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build native mobile app for iOS and Android',
    status: 'active',
    progress: 40,
    startDate: '2025-01-15',
    endDate: '2025-06-30',
    color: 'bg-purple-500',
    team: [
      { userId: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager' },
      { userId: 'user1', name: 'John Doe', email: 'user@example.com', role: 'admin' },
      { userId: 'user4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'member' },
    ],
    tasks: 48,
    completedTasks: 19,
    createdBy: 'user2',
    createdAt: '2025-01-15',
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    description: 'Plan and execute Q1 marketing campaigns',
    status: 'active',
    progress: 80,
    startDate: '2024-12-01',
    endDate: '2025-03-31',
    color: 'bg-green-500',
    team: [
      { userId: 'user3', name: 'Mike Johnson', email: 'mike@example.com', role: 'manager' },
      { userId: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'member' },
    ],
    tasks: 15,
    completedTasks: 12,
    createdBy: 'user3',
    createdAt: '2024-12-01',
  },
  {
    id: '4',
    name: 'API Integration',
    description: 'Integrate third-party APIs and services',
    status: 'planning',
    progress: 15,
    startDate: '2025-02-01',
    endDate: '2025-04-30',
    color: 'bg-orange-500',
    team: [
      { userId: 'user1', name: 'John Doe', email: 'user@example.com', role: 'manager' },
      { userId: 'user3', name: 'Mike Johnson', email: 'mike@example.com', role: 'admin' },
    ],
    tasks: 32,
    completedTasks: 5,
    createdBy: 'user1',
    createdAt: '2025-02-01',
  },
  {
    id: '5',
    name: 'Database Migration',
    description: 'Migrate legacy database to new infrastructure',
    status: 'completed',
    progress: 100,
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    color: 'bg-teal-500',
    team: [
      { userId: 'user2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager' },
      { userId: 'user1', name: 'John Doe', email: 'user@example.com', role: 'member' },
      { userId: 'user3', name: 'Mike Johnson', email: 'mike@example.com', role: 'member' },
    ],
    tasks: 18,
    completedTasks: 18,
    createdBy: 'user2',
    createdAt: '2024-10-01',
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <MainLayout currentUser={currentUser} onLogout={handleLogout} />;
}