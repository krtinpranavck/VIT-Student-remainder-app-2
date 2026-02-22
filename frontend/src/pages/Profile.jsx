import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const Profile = () => {
  const { userProfile, updateUserProfile, theme, toggleTheme } = useTasks();
  const [activeTab, setActiveTab] = useState('info'); // info, settings
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateUserProfile(formData);
      setIsEditing(false);
    } else {
      // Start editing - reset form data to current profile just in case
      setFormData(userProfile);
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="module-container">
      <div className="profile-header">
        <div className="avatar-circle">
          {userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
        </div>
        <div className="user-info">
          {isEditing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="edit-input-large"
            />
          ) : (
            <h1>{userProfile.name}</h1>
          )}
          <p>{userProfile.regNo}</p>
          <p>{userProfile.branch}</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'info' ? 'active' : ''}
          onClick={() => setActiveTab('info')}
        >
          Personal Info
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'info' ? (
          <div className="info-panel">
            <div className="panel-header">
              <h3>Details</h3>
              <button className="btn-edit" onClick={handleEditToggle}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            {['email', 'phone', 'hostelBlock', 'roomNo', 'proctor'].map((field) => (
              <div key={field} className="info-row">
                <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                {isEditing ? (
                  field === 'hostelBlock' ? (
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="edit-input"
                    >
                      {['A', 'B', 'C', 'D1', 'D2', 'E'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  )
                ) : (
                  <span>{userProfile[field]}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="settings-panel">
            <h3>Notification Preferences</h3>
            <div className="setting-item">
              <span>Exam Reminders</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Event Updates</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Club Activities</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

            <h3 style={{ marginTop: '2rem' }}>Appearance</h3>
            <div className="setting-item">
              <span>Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .module-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
          padding: 2rem;
          border-radius: var(--radius-lg);
          color: white;
        }

        .avatar-circle {
          width: 80px;
          height: 80px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          border: 3px solid rgba(255,255,255,0.5);
        }

        .user-info {
          flex: 1;
        }

        .user-info h1 {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }
        .user-info p {
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .edit-input-large {
          font-size: 1.5rem;
          font-weight: 700;
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          width: 100%;
          margin-bottom: 0.5rem;
        }
        .edit-input-large:focus {
          outline: 2px solid rgba(255,255,255,0.5);
        }

        .tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid #eee;
          margin-bottom: 2rem;
        }

        .tabs button {
          padding: 0.75rem 0;
          background: none;
          color: hsl(var(--text-muted));
          font-weight: 500;
          position: relative;
        }

        .tabs button.active {
          color: hsl(var(--primary));
        }

        .tabs button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: hsl(var(--primary));
        }

        .info-panel, .settings-panel {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .btn-edit {
          color: hsl(var(--primary));
          font-weight: 600;
          background: none;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-row label {
          color: hsl(var(--text-muted));
          flex: 1;
        }
        .info-row span {
          font-weight: 500;
          text-align: right;
          flex: 2;
        }

        .edit-input {
          flex: 2;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          text-align: right;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #f1f5f9;
        }

        /* Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: hsl(var(--primary));
        }
        input:checked + .slider:before {
          transform: translateX(24px);
        }
      `}</style>
    </div>
  );
};

export default Profile;
