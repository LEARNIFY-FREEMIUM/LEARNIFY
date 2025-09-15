import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { BetaBanner } from './components/BetaBanner';
import { HomePage } from './pages/HomePage';
import { TutorialsPage } from './pages/TutorialsPage';
import { TutorialDetailPage } from './pages/TutorialDetailPage';
import { PremiumPage } from './pages/PremiumPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { UpgradePage } from './pages/UpgradePage';
import { ChatPage } from './pages/ChatPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <BetaBanner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;