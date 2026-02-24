import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, Palette, Database, Mail, Shield, CheckCircle, X } from 'lucide-react';

export const AdminSettings = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState({
    // Profile
    fullName: 'Admin User',
    email: 'admin@edu.edu',
    phone: '+1 234 567 8900',
    department: 'Administration',
    
    // Notifications
    emailNotifications: true,
    requestNotifications: true,
    uploadNotifications: false,
    weeklyReports: true,
    
    // System
    autoApproveRequests: false,
    maxUploadSize: '10',
    sessionTimeout: '30',
    maintenanceMode: false,
    
    // Security
    twoFactorAuth: false,
    loginAlerts: true,
    passwordExpiry: '90',
    
    // Appearance
    theme: 'light',
    compactView: false,
  });

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Simulate save action
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="dashboard-wrapper dashboard-wrapper--bottom-nav">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-[slideInRight_0.3s_ease-out]">
          <div className="flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 shadow-lg">
            <CheckCircle size={20} className="text-teal-600" />
            <div>
              <p className="font-semibold text-teal-900">Settings Saved!</p>
              <p className="text-sm text-teal-700">Your changes have been applied successfully.</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-teal-600 transition-colors hover:text-teal-800"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
      <main className="dashboard-main dashboard-main--bottom-nav">
        <section className="dashboard-welcome admin-welcome">
          <button
            type="button"
            className="mb-3 inline-flex items-center justify-center rounded-lg border border-teal-200 bg-teal-50 p-2 text-teal-700 transition-colors hover:bg-teal-100"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="heading-entrance heading-premium">Admin Settings</h1>
          <p className="heading-entrance heading-entrance-delay-1">Configure your dashboard preferences and system settings.</p>
        </section>

        {/* Profile Settings */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium flex items-center gap-2">
            <User size={20} className="text-teal-600" />
            Profile Information
          </h2>
          <div className="admin-action-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                <input
                  type="tel"
                  className="admin-input"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
                <select
                  className="admin-input"
                  value={settings.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="Administration">Administration</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium flex items-center gap-2">
            <Bell size={20} className="text-teal-600" />
            Notification Preferences
          </h2>
          <div className="admin-action-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Email Notifications</p>
                  <p className="text-sm text-slate-500">Receive email updates for important events</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Resource Request Notifications</p>
                  <p className="text-sm text-slate-500">Get notified when students submit resource requests</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.requestNotifications}
                    onChange={(e) => handleInputChange('requestNotifications', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Upload Notifications</p>
                  <p className="text-sm text-slate-500">Alert when new resources are uploaded</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.uploadNotifications}
                    onChange={(e) => handleInputChange('uploadNotifications', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Weekly Activity Reports</p>
                  <p className="text-sm text-slate-500">Receive weekly summaries via email</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.weeklyReports}
                    onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* System Settings */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium flex items-center gap-2">
            <Database size={20} className="text-teal-600" />
            System Configuration
          </h2>
          <div className="admin-action-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Auto-Approve Requests</p>
                  <p className="text-sm text-slate-500">Automatically approve resource requests from verified students</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.autoApproveRequests}
                    onChange={(e) => handleInputChange('autoApproveRequests', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Maintenance Mode</p>
                  <p className="text-sm text-slate-500">Temporarily disable student access for maintenance</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Max Upload Size (MB)</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={settings.maxUploadSize}
                    onChange={(e) => handleInputChange('maxUploadSize', e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium flex items-center gap-2">
            <Shield size={20} className="text-teal-600" />
            Security & Privacy
          </h2>
          <div className="admin-action-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Login Alerts</p>
                  <p className="text-sm text-slate-500">Get notified of login attempts from new devices</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.loginAlerts}
                    onChange={(e) => handleInputChange('loginAlerts', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Password Expiry (days)</label>
                <input
                  type="number"
                  className="admin-input"
                  value={settings.passwordExpiry}
                  onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
                />
                <p className="mt-1 text-xs text-slate-500">Set to 0 for passwords that never expire</p>
              </div>
              <div>
                <button className="admin-button admin-button--secondary">
                  <Lock size={16} />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Appearance Settings */}
        <section className="dashboard-section">
          <h2 className="section-title heading-entrance heading-premium flex items-center gap-2">
            <Palette size={20} className="text-teal-600" />
            Appearance
          </h2>
          <div className="admin-action-card">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Theme</label>
                <select
                  className="admin-input"
                  value={settings.theme}
                  onChange={(e) => handleInputChange('theme', e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-700">Compact View</p>
                  <p className="text-sm text-slate-500">Reduce spacing and show more content on screen</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={settings.compactView}
                    onChange={(e) => handleInputChange('compactView', e.target.checked)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300"></div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <section className="dashboard-section">
          <div className="admin-action-card">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Changes will be applied immediately after saving.
              </p>
              <button
                className="admin-button admin-button--primary"
                onClick={handleSave}
              >
                Save All Settings
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
