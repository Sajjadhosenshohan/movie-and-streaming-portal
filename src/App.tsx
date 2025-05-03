import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import MediaDetailsPage from './pages/MediaDetailsPage';
import WatchlistPage from './pages/WatchlistPage';
import PurchasesPage from './pages/PurchasesPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Auth
import { useAuthStore } from './store/authStore';

function App() {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    // Check if user is already logged in
    checkAuth();
  }, [checkAuth]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/media/:id" element={<MediaDetailsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;