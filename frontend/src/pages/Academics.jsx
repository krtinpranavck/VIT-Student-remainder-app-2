import React from 'react';
import { useTasks } from '../context/TaskContext';

const Academics = () => {
  const { addTask } = useTasks();

  const subjects = [
    { code: 'BCSE203E', name: 'Web Programming', faculty: 'Dr. Rajkumar S', slot: 'G2' },
    { code: 'BCSE302L', name: 'Database Management Systems', faculty: 'Prof. Vijaykumar K P', slot: 'D2+TD2' },
    { code: 'BMAT201L', name: 'CVLA', faculty: 'Dr. Manimaran J', slot: 'A1+TA1+TAA1' },
    { code: 'BCSE306L', name: 'Artificial Intelligence', faculty: 'Prof. Tamilarasi K', slot: 'F2' },
  ];

  const exams = [
    { subject: 'Software Engineering', date: '2026-03-10', time: '10:00 - 13:00', venue: 'AB3 308' },
    { subject: 'Cloud Computing', date: '2026-03-12', time: '14:00 - 17:00', venue: 'AB1 203' },
  ];

  const handleAddReminder = (subjectName) => {
    addTask({
      title: `${subjectName} Assignment`,
      description: 'Reminder added from Academics module',
      date: new Date().toISOString().split('T')[0], // Default today
      time: '23:59',
      priority: 'high',
      category: 'Academics'
    });
    alert(`Reminder added for ${subjectName}`);
  };

  return (
    <div className="module-container">
      <header className="module-header">
        <h1>Academics</h1>
        <p>Track your subjects, exams, and assignments.</p>
      </header>

      <section className="subjects-grid">
        {subjects.map(sub => (
          <div key={sub.code} className="subject-card">
            <div className="card-top">
              <span className="slot-badge">{sub.slot}</span>
              <h3>{sub.code}</h3>
            </div>
            <h4>{sub.name}</h4>
            <p className="faculty">{sub.faculty}</p>
            <button className="btn-outline" onClick={() => handleAddReminder(sub.name)}>
              + Add Reminder
            </button>
          </div>
        ))}
      </section>

      <section className="exams-section">
        <h2>Exam Timetable</h2>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => (
                <tr key={idx}>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>{exam.time}</td>
                  <td>{exam.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <style>{`
        .module-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .module-header {
          margin-bottom: 2rem;
        }
        .module-header h1 {
          font-size: 2rem;
          color: hsl(var(--primary));
          margin-bottom: 0.5rem;
        }
        .module-header p {
          color: hsl(var(--text-muted));
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .subject-card {
          background: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s;
          display: flex;
          flex-direction: column;
        }
        .subject-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .slot-badge {
          background: hsl(var(--primary-light));
          color: hsl(var(--primary));
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .subject-card h3 {
          font-size: 0.9rem;
          color: hsl(var(--text-muted));
        }

        .subject-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: hsl(var(--text-main));
        }

        .faculty {
          font-size: 0.85rem;
          color: hsl(var(--text-muted));
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .btn-outline {
          border: 1px solid hsl(var(--primary));
          color: hsl(var(--primary));
          background: white;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: var(--transition);
        }
        .btn-outline:hover {
          background: hsl(var(--primary));
          color: white;
        }

        .exams-section h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .table-wrapper {
          background: white;
          border-radius: var(--radius-lg);
          padding: 1rem;
          box-shadow: var(--shadow-sm);
          overflow-x: auto;
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
        }

        .custom-table th, .custom-table td {
          text-align: left;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .custom-table th {
          color: hsl(var(--text-muted));
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .custom-table tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default Academics;
