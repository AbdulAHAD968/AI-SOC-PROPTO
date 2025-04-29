import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './components/DashboardPage';
import AlertsPage from './components/AlertsPage';
import AnalyticsPage from './components/AnalyticsPage';
import ThreatIntelPage from './components/ThreatIntelPage';
import SettingsPage from './components/SettingsPage';
import AIRecommendations from './components/AIRecommendations';
import SystemStatus from './components/SystemStatus';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - standalone route */}
        <Route path="/" element={<LandingPage />} />

        {/* All dashboard routes - nested under the layout */}
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="threat-intel" element={<ThreatIntelPage />} />
          <Route path="systemstatus" element={<SystemStatus />} />
          <Route path="ai-recommendations" element={<AIRecommendations />} />
          <Route path="profile-settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;