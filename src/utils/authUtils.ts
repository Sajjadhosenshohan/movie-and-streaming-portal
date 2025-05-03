import { User } from '../types';
import { users } from '../data/mockData';

// Mock authentication utilities
// In a real app, these would make API requests to a backend

export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // In a real app, we'd verify the password hash here
  // For demo purposes, we just check if password is "password"
  if (password !== 'password') {
    throw new Error('Invalid email or password');
  }
  
  // Store the user in localStorage (in a real app, we'd store a JWT)
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user with email already exists
  if (users.find(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  // In a real app, we'd create a user in the database
  // For demo purposes, we'll just return a mock user
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
    role: 'user',
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  };
  
  // Store the user in localStorage (in a real app, we'd store a JWT)
  localStorage.setItem('user', JSON.stringify(newUser));
  
  return newUser;
};

export const logoutUser = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

export const forgotPassword = async (email: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user with email exists
  if (!users.find(u => u.email === email)) {
    throw new Error('No user found with this email');
  }
  
  // In a real app, we'd send a password reset email
  console.log(`Password reset email sent to ${email}`);
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, we'd verify the token and update the password
  console.log(`Password reset for token ${token}`);
};