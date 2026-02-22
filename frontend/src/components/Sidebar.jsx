import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const Sidebar = () => {
  const { tasks, getPriorityColor } = useTasks();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Academics', path: '/academics' },
    { name: 'Events', path: '/events' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Hostel', path: '/hostel' },
    { name: 'Profile', path: '/profile' },
  ];

  // Logic to find upcoming deadlines (simplified: just list next 3 tasks)
  // In a real app, we'd filter by date > today
  // Sort by date/time ascending
  const upcomingTasks = [...tasks]
    .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
    .slice(0, 3);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>VIT Reminder</h2>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-notifications">
        <h3>Upcoming Deadlines</h3>
        {upcomingTasks.length > 0 ? (
          <ul className="notification-list">
            {upcomingTasks.map(task => (
              <li key={task.id} className="notification-item" onClick={() => navigate('/')}>
                <div className="notif-header">
                  <span className="notif-title">{task.title}</span>
                  <span className="notif-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}></span>
                </div>
                <div className="notif-date">
                  {new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {task.time}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-msg">No upcoming deadlines.</p>
        )}
      </div>

      <style>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: hsl(var(--bg-sidebar));
          color: white;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          position: fixed;
          left: 0;
          top: 0;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          z-index: 100;
        }

        .sidebar-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: hsl(var(--primary-light));
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-link {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          color: hsl(var(--text-light));
          transition: var(--transition);
          opacity: 0.8;
          font-weight: 500;
        }

        .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
          opacity: 1;
        }

        .nav-link.active {
          background-color: hsl(var(--primary));
          color: white;
          opacity: 1;
          box-shadow: var(--shadow-sm);
        }

        .sidebar-notifications {
          margin-top: auto;
          background: rgba(255,255,255,0.05);
          padding: 1rem;
          border-radius: var(--radius-md);
        }

        .sidebar-notifications h3 {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: hsl(var(--text-muted));
          margin-bottom: 0.75rem;
        }

        .notification-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .notification-item {
          cursor: pointer;
          transition: var(--transition);
        }
        
        .notification-item:hover {
          opacity: 0.8;
        }

        .notif-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .notif-title {
          font-size: 0.85rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }

        .notif-priority {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .notif-date {
          font-size: 0.75rem;
          color: hsl(var(--text-muted));
        }

        .empty-msg {
          font-size: 0.85rem;
          color: hsl(var(--text-muted));
          font-style: italic;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
