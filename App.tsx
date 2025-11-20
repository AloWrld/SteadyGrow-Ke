import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import SocialSpeech from './pages/SocialSpeech';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { UserProfile } from './types';

const App: React.FC = () => {
  // Mock authentication state
  const [user, setUser] = useState<UserProfile | null>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} onLogout={() => setUser(null)} />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/social-speech" element={<SocialSpeech />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;