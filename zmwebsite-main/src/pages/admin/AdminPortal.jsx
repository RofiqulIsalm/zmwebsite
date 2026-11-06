import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './admin.css';

export default function AdminPortal({ navigate }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('zm_admin_token');
      if (!token) {
        setCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch('/api/auth.php?action=check', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok && data.success && data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem('zm_admin_token');
        }
      } catch (err) {
        console.warn('Admin auth check failed:', err);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('zm_admin_token');
      if (token) {
        await fetch('/api/auth.php?action=logout', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (e) {
      // Ignore
    } finally {
      localStorage.removeItem('zm_admin_token');
      setUser(null);
    }
  };

  if (checkingAuth) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Verifying secure credentials...</p>
      </div>
    );
  }

  return user ? (
    <AdminDashboard user={user} onLogout={handleLogout} navigate={navigate} />
  ) : (
    <AdminLogin onLoginSuccess={setUser} />
  );
}
