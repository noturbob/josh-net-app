import React, { createContext, useState, useContext } from 'react';

// Define the 4 Roles for JoshNet V3
export type UserRole = 'STUDENT' | 'FACULTY' | 'ALUMNI' | 'ADMIN' | null;

interface AuthContextType {
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null); // Default: null (Not logged in)

  const login = (newRole: UserRole) => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};