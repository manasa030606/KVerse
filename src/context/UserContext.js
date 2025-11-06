// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    username: 'kpop_lover_2024',
    displayName: 'Alex',
    email: 'alex@example.com',
    profilePic: '👤',
    bio: 'KPOP enthusiast | BTS ARMY 💜',
    points: 1250,
    level: 5,
    badges: ['🎵', '🏆', '⭐'],
    favoriteGroup: 'BTS',
    joinedDate: '2024-01-15',
    postsCount: 42,
    challengesWon: 8,
    gamesWon: 15,
    followersCount: 234,
    followingCount: 189,
  });

  const login = (email, password) => {
    // Mock login - in real app, this would call an API
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = (username, email, password) => {
    // Mock registration
    setUser({
      ...user,
      username,
      email,
      displayName: username,
    });
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Reset to default user
    setUser({
      id: 1,
      username: 'kpop_lover_2024',
      displayName: 'Alex',
      email: 'alex@example.com',
      profilePic: '👤',
      bio: 'KPOP enthusiast | BTS ARMY 💜',
      points: 1250,
      level: 5,
      badges: ['🎵', '🏆', '⭐'],
      favoriteGroup: 'BTS',
      joinedDate: '2024-01-15',
      postsCount: 42,
      challengesWon: 8,
      gamesWon: 15,
      followersCount: 234,
      followingCount: 189,
    });
  };

  const updateUser = (updates) => {
    setUser({ ...user, ...updates });
  };

  const addPoints = (points) => {
    setUser({ ...user, points: user.points + points });
  };

  const deductPoints = (points) => {
    if (user.points >= points) {
      setUser({ ...user, points: user.points - points });
      return { success: true };
    }
    return { success: false, message: 'Insufficient points' };
  };

  const addBadge = (badge) => {
    if (!user.badges.includes(badge)) {
      setUser({ ...user, badges: [...user.badges, badge] });
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateUser,
    addPoints,
    deductPoints,
    addBadge,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;