import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Dummy login - replace with actual API call
    // Admin credentials: admin@cuereserve.com / admin123
    // User credentials: user@example.com / user123
    
    let mockUser;
    
    if (email === 'admin@cuereserve.com' && password === 'admin123') {
      mockUser = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
      };
    } else if (email === 'user@example.com' && password === 'user123') {
      mockUser = {
        id: 2,
        name: 'John Doe',
        email: email,
        role: 'customer',
      };
    } else {
      throw new Error('Invalid credentials');
    }

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'dummy-jwt-token');
  };

  const register = async (name, email, password) => {
    // Dummy registration - replace with actual API call
    const mockUser = {
      id: Date.now(),
      name,
      email,
      role: 'customer',
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'dummy-jwt-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'staff',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
