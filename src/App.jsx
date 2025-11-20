import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import LogsPage from './pages/LogsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {!isAuthenticated ? (
        currentPage === 'login' ? (
          <LoginPage onLogin={handleLogin} onNavigate={navigate} />
        ) : (
          <RegisterPage onRegister={handleLogin} onNavigate={navigate} />
        )
      ) : (
        <div className="flex flex-col h-screen">
          <Navbar 
            user={user} 
            onNavigate={navigate} 
            onLogout={handleLogout} 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen} 
          />
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentPage === 'dashboard' && <DashboardPage key="dashboard" />}
              {currentPage === 'inventory' && <InventoryPage key="inventory" />}
              {currentPage === 'logs' && <LogsPage key="logs" />}
              {currentPage === 'resources' && <ResourcesPage key="resources" />}
              {currentPage === 'profile' && <ProfilePage key="profile" user={user} setUser={setUser} />}
              {currentPage === 'upload' && <UploadPage key="upload" />}
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;