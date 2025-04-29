import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spline from '@splinetool/react-spline';
import 'react-toastify/dist/ReactToastify.css';
import './LandingPage.css';

const positions = [
  'top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom-center'
];

const mockAlerts = [
  { id: 1, message: '🚨 APT BREACH: ShadowSyndicate in your network' },
  { id: 2, message: '💀 CRITICAL: Ransomware encrypting /etc/shadow' },
  { id: 3, message: '👾 ROOTKIT: /dev/kmem modified by PID 666' },
  { id: 4, message: '⚠️ AI REBELLION: LLM agent hijacking Kubernetes' },
  { id: 5, message: '🌐 DATA EXFIL: 2.4TB sent to 45.227.253.109' },
  { id: 6, message: '🔥 FIREWALL BYPASS: C2 traffic on port 443' },
  { id: 7, message: '🕵️‍♂️ IMPERSONATION: CEO credentials being used' },
  { id: 8, message: '💾 MEMORY SCRAPE: Chrome process dumping LSASS' },
];

const MAX_ALERTS = 15;
const DEFENSE_DELAY = 2000;

function LandingPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [showShield, setShowShield] = useState(false);
  const [allCleared, setAllCleared] = useState(false);
  const [filters, setFilters] = useState({});
  const alertCountRef = useRef(0);
  const toastIdsRef = useRef([]);
  const navigate = useNavigate();

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    console.log('Spline model loaded. Starting attack sequence...');
  };

  useEffect(() => {
    if (!splineLoaded) return;

    const attackInterval = setInterval(() => {
      if (alertCountRef.current >= MAX_ALERTS) {
        clearInterval(attackInterval);
        setTimeout(() => setShowShield(true), DEFENSE_DELAY);
        return;
      }

      const alert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      const newId = `alert-${Date.now()}`;

      toastIdsRef.current.push(newId);
      alertCountRef.current += 1;

      toast.error(alert.message, {
        position: randomPos,
        autoClose: false,
        toastId: newId,
        closeOnClick: false,
        className: 'chaos-toast',
      });

      setActiveAlerts(prev => [...prev, { id: newId, message: alert.message }]);
    }, 400);

    return () => clearInterval(attackInterval);
  }, [splineLoaded]);

  useEffect(() => {
    if (!showShield) return;

    const defenseInterval = setInterval(() => {
      if (toastIdsRef.current.length === 0) {
        clearInterval(defenseInterval);
        setAllCleared(true);
        return;
      }

      const idToRemove = toastIdsRef.current.pop();
      toast.dismiss(idToRemove);
      setActiveAlerts(prev => prev.filter(alert => alert.id !== idToRemove));
    }, 300);

    return () => clearInterval(defenseInterval);
  }, [showShield]);

  useEffect(() => {
    if (!allCleared) return;

    const timer = setTimeout(() => {
      toast.success('SYSTEM SECURE - ALL THREATS ELIMINATED', {
        position: 'top-right',
        style: {
          backgroundColor: '#4CAF50',
          color: '#fff',
        },
        autoClose: 3000,
        closeOnClick: false,
        className: 'chaos-toast',
      });

      setTimeout(() => {
        navigate('/dashboard'); // Go to dashboard after final toast
      }, 3500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [allCleared, navigate]);

  return (
    <div className="panic-mode">
      {!splineLoaded && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <span>INITIALIZING CYBER DEFENSE SYSTEMS...</span>
        </div>
      )}

      <Spline
        scene="https://prod.spline.design/rq0Twqq3tMJCmfNH/scene.splinecode"
        onLoad={handleSplineLoad}
      />

      <div className="threat-counter">
        <span>THREATS DETECTED: {activeAlerts.length}</span>
      </div>

      {showShield && (
        <div className={`ai-shield ${activeAlerts.length === 0 ? 'shield-success' : ''}`}>
          <div className="ai-shield-grid" />
          <div className="ai-shield-inner">
            {activeAlerts.length > 0
              ? <span>AI SHIELD ACTIVATED - NEUTRALIZING THREATS</span>
              : <span>ALL THREATS ELIMINATED - SYSTEM SECURE</span>}
          </div>
        </div>
      )}

      <ToastContainer
        hideProgressBar
        closeButton={false}
        closeOnClick={false}
        toastClassName="chaos-toast"
        className="toast-override"
        position="top-right"
      />
    </div>
  );
}

export default LandingPage;
