import React from 'react';
import { useTasks } from '../context/TaskContext';

const Events = () => {
    const { events, addTask } = useTasks();

    const handleAddToCalendar = (event) => {
        addTask({
            title: event.title,
            description: event.description,
            date: event.date,
            time: '09:00', // Default time
            priority: 'medium',
            category: 'Events' // Changed to map to valid category if needed context-wise
        });
        alert('Event added to your calendar tasks!');
    };

    return (
        <div className="module-container">
            <header className="module-header">
                <h1>University Events</h1>
                <p>Stay updated with the latest happenings at VIT.</p>
            </header>

            <div className="events-list">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <div className="event-date">
                            <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                            <span className="day">{new Date(event.date).getDate()}</span>
                        </div>
                        <div className="event-details">
                            <h3>{event.title}</h3>
                            <p className="location">📍 {event.location}</p>
                            <p className="desc">{event.description}</p>
                        </div>
                        <button className="btn-add" onClick={() => handleAddToCalendar(event)}>
                            Add to Calendar
                        </button>
                    </div>
                ))}

                {events.length === 0 && <p className="no-data">No upcoming events.</p>}
            </div>

            <style>{`
        .module-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .module-header {
           margin-bottom: 2rem;
           text-align: center;
        }
        .module-header h1 {
           font-size: 2rem;
           color: hsl(var(--secondary));
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .event-card {
          background: white;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .event-card:hover {
          transform: translateX(5px);
          box-shadow: var(--shadow-md);
        }

        .event-date {
          background: hsl(var(--bg-body));
          padding: 1rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
        }

        .event-date .month {
          font-size: 0.85rem;
          color: hsl(var(--text-muted));
          text-transform: uppercase;
        }

        .event-date .day {
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(var(--secondary));
        }

        .event-details {
          flex: 1;
        }

        .event-details h3 {
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
        }

        .location {
          font-size: 0.85rem;
          color: hsl(var(--text-muted));
          margin-bottom: 0.5rem;
        }
        .desc {
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .btn-add {
          background:  hsl(var(--secondary));
          color: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .btn-add:hover {
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          .event-card {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          .btn-add {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default Events;
