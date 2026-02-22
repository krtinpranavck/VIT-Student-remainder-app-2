import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const Home = () => {
  const { tasks, addTask, getPriorityColor } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [showAddModal, setShowAddModal] = useState(false);

  // Calendar Logic
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startDay = startDayOfMonth(currentDate);

    // Padding for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="calendar-day padding"></div>);
    }

    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayTasks = tasks.filter(t => t.date === dateStr);

      const isSelected = selectedDate.getDate() === d &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      const isToday = new Date().getDate() === d &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={d}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), d))}
        >
          <span className="day-number">{d}</span>
          <div className="day-indicators">
            {dayTasks.map(task => (
              <span
                key={task.id}
                className="task-dot"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
                title={task.title}
              ></span>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  // Add Task Form Handler
  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTask = {
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
      time: formData.get('time'),
      priority: formData.get('priority'),
      category: formData.get('category'),
    };
    addTask(newTask);
    setShowAddModal(false);
  };

  // Filter tasks for selected date
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const selectedDateTasks = tasks.filter(t => t.date === selectedDateStr);

  return (
    <div className="home-container">
      <header className="page-header">
        <div className="calendar-nav">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>

        <div className="header-actions">
          <div className="view-toggle">
            <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Month</button>
            <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Week</button>
            <button className={view === 'day' ? 'active' : ''} onClick={() => setView('day')}>Day</button>
          </div>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>+ Add Task</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="calendar-wrapper">
          <div className="weekdays-header">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="calendar-grid">
            {generateCalendarDays()}
          </div>
        </div>

        <div className="task-panel">
          <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>
          {selectedDateTasks.length > 0 ? (
            <ul className="task-list">
              {selectedDateTasks.map(task => (
                <li key={task.id} className="task-card" style={{ borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}>
                  <h4>{task.title}</h4>
                  <p className="task-time">{task.time}</p>
                  <p className="task-desc">{task.category} • {task.priority}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-tasks">
              <p>No tasks for this day.</p>
              <button className="btn-text" onClick={() => setShowAddModal(true)}>Add one?</button>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" required placeholder="Assignment / Exam" />
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Date</label>
                  <input name="date" type="date" required defaultValue={selectedDateStr} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input name="time" type="time" required />
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category">
                    <option value="Academics">Academics</option>
                    <option value="Clubs">Clubs</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" rows="3"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .home-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .calendar-nav h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: hsl(var(--text-main));
          min-width: 200px;
          text-align: center;
        }

        .calendar-nav button {
          background: none;
          font-size: 1.5rem;
          color: hsl(var(--text-muted));
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .calendar-nav button:hover {
          background-color: rgba(0,0,0,0.05);
          color: hsl(var(--text-main));
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .view-toggle {
          background: white;
          border-radius: var(--radius-sm);
          padding: 0.25rem;
          display: flex;
          box-shadow: var(--shadow-sm);
        }

        .view-toggle button {
          background: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          color: hsl(var(--text-muted));
        }

        .view-toggle button.active {
          background-color: hsl(var(--bg-body));
          color: hsl(var(--primary));
          box-shadow: var(--shadow-sm);
        }

        .btn-primary {
          background-color: hsl(var(--primary));
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: var(--transition);
        }
        .btn-primary:hover {
          background-color: hsl(var(--primary-dark));
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          height: 100%;
        }

        .calendar-wrapper {
          background: white;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
        }

        .weekdays-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          font-weight: 600;
          color: hsl(var(--text-muted));
          margin-bottom: 1rem;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-auto-rows: 100px;
          gap: 1px;
          background-color: #eee;
          border: 1px solid #eee;
        }

        .calendar-day {
          background-color: white;
          padding: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .calendar-day:hover {
          background-color: hsl(var(--primary-light));
        }

        .calendar-day.selected {
          background-color: hsl(var(--bg-body));
          box-shadow: inset 0 0 0 2px hsl(var(--primary));
        }

        .calendar-day.today .day-number {
          background-color: hsl(var(--primary));
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .calendar-day.padding {
          background-color: #fafafa;
          cursor: default;
        }

        .day-number {
          font-weight: 500;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
        }

        .day-indicators {
          display: flex;
          gap: 2px;
          flex-wrap: wrap;
        }

        .task-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .task-panel {
          background: white;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
        }

        .task-panel h3 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: hsl(var(--text-main));
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow-y: auto;
          max-height: 500px;
        }

        .task-card {
           background: hsl(var(--bg-body));
           padding: 1rem;
           border-radius: var(--radius-sm);
           transition: transform 0.2s;
        }
        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .task-card h4 {
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .task-time {
          font-size: 0.8rem;
          color: hsl(var(--text-muted));
          font-weight: 500;
        }
        .task-desc {
           font-size: 0.8rem;
           color: hsl(var(--text-muted));
           margin-top: 0.25rem;
        }

        .no-tasks {
          text-align: center;
          padding: 2rem 0;
          color: hsl(var(--text-muted));
        }
        .btn-text {
          background: none;
          color: hsl(var(--primary));
          text-decoration: underline;
          margin-top: 0.5rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: var(--radius-lg);
          padding: 2rem;
          width: 400px;
          box-shadow: var(--shadow-lg);
        }

        .modal h3 {
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }
        
        .row {
          display: flex;
          gap: 1rem;
        }
        .row .form-group {
          flex: 1;
        }

        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
          color: hsl(var(--text-muted));
        }

        input, select, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          font-family: inherit;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .modal-actions button[type="button"] {
          background: none;
          color: hsl(var(--text-muted));
        }

        @media (max-width: 1024px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
