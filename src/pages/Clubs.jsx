import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const Clubs = () => {
  const { myClubs, addClub, tasks, addTask } = useTasks();
  const [selectedClub, setSelectedClub] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Club Form State
  const [newClubName, setNewClubName] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');

  // Task Form State (for inside club)
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);

  const handleCreateClub = (e) => {
    e.preventDefault();
    if (!newClubName) return;
    addClub({ name: newClubName, description: newClubDesc });
    setNewClubName('');
    setNewClubDesc('');
    setShowAddModal(false);
  };

  const handleAddClubTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      description: `Work for ${selectedClub.name}`,
      date: taskDate,
      time: taskTime || '09:00',
      priority: 'medium',
      category: 'Clubs',
      clubName: selectedClub.name // Tagging the task
    });

    setTaskTitle('');
    setTaskTime('');
    alert('Task added to club schedule!');
  };

  // Filter tasks for the selected club
  const clubTasks = selectedClub
    ? tasks.filter(t => t.category === 'Clubs' && t.clubName === selectedClub.name)
    : [];

  if (selectedClub) {
    return (
      <div className="module-container">
        <button className="btn-back" onClick={() => setSelectedClub(null)}>← Back to Clubs</button>

        <header className="club-detail-header">
          <h1>{selectedClub.name}</h1>
          <p>{selectedClub.description}</p>
        </header>

        <div className="club-workspace">
          <section className="club-tasks">
            <h3>To-Do List & Schedule</h3>
            {clubTasks.length > 0 ? (
              <ul className="task-list">
                {clubTasks.map(task => (
                  <li key={task.id} className="task-item">
                    <span className="task-title">{task.title}</span>
                    <span className="task-meta">{task.date} at {task.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-msg">No work scheduled yet.</p>
            )}
          </section>

          <section className="add-work-form">
            <h3>Add Work / Meeting</h3>
            <form onSubmit={handleAddClubTask}>
              <div className="form-group">
                <label>Title / Meeting Name</label>
                <input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Core Team Meet"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn-primary">Add Schedule</button>
            </form>
          </section>
        </div>

        <style>{`
            .btn-back {
                background: none;
                color: hsl(var(--text-muted));
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }
            .btn-back:hover { color: hsl(var(--primary)); }

            .club-detail-header {
                margin-bottom: 2rem;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                padding-bottom: 1rem;
            }
            .club-detail-header h1 { color: hsl(var(--primary)); }

            .club-workspace {
                display: grid;
                grid-template-columns: 1fr 350px;
                gap: 2rem;
            }

            .club-tasks {
                background: white;
                padding: 1.5rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-sm);
            }

            .task-item {
                display: flex;
                justify-content: space-between;
                padding: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
            }
            .task-title { font-weight: 500; }
            .task-meta { color: hsl(var(--text-muted)); font-size: 0.85rem; }

            .add-work-form {
                background: hsl(var(--bg-body)); /* darker contrast */
                padding: 1.5rem;
                border-radius: var(--radius-lg);
                border: 1px solid rgba(0,0,0,0.05);
            }
            
            .form-group { margin-bottom: 1rem; }
            .form-row { display: flex; gap: 1rem; }
            
            input {
                width: 100%;
                padding: 0.5rem;
                border-radius: var(--radius-sm);
                border: 1px solid #ddd;
            }

            @media (max-width: 768px) {
                .club-workspace { grid-template-columns: 1fr; }
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="module-container">
      <header className="module-header">
        <h1>My Clubs</h1>
        <p>Manage your club memberships and work.</p>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>+ Add Club</button>
      </header>

      <div className="clubs-grid">
        {myClubs.map(club => (
          <div key={club.id} className="club-card" onClick={() => setSelectedClub(club)}>
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <span className="enter-hint">Click to open workspace →</span>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Club</h3>
            <form onSubmit={handleCreateClub}>
              <div className="form-group">
                <label>Club Name</label>
                <input
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  value={newClubDesc}
                  onChange={(e) => setNewClubDesc(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Club</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .module-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .module-header {
           margin-bottom: 2rem;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }
        .module-header h1 {
           font-size: 2rem;
           color: hsl(var(--primary));
        }

        .clubs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .club-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: var(--transition);
          border: 2px solid transparent;
        }
        
        .club-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: hsl(var(--primary));
        }

        .club-card h3 {
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }

        .club-card p {
          color: hsl(var(--text-muted));
          margin-bottom: 1.5rem;
        }

        .enter-hint {
            font-size: 0.85rem;
            color: hsl(var(--primary));
            font-weight: 500;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          width: 400px;
        }
        
        .modal h3 { margin-bottom: 1rem; }
        
        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 1rem;
        }

        .btn-primary {
            background: hsl(var(--primary));
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--radius-sm);
        }
        .btn-primary:hover { background: hsl(var(--primary-dark)); }
      `}</style>
    </div>
  );
};

export default Clubs;
