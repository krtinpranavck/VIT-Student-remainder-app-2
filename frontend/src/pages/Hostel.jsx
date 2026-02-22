import React from 'react';

const Hostel = () => {
    const messMenu = [
        { day: 'Monday', breakfast: 'Idli, Sambar', lunch: 'Rice, Dal, Veg Curry', dinner: 'Chapati, Paneer' },
        { day: 'Tuesday', breakfast: 'Pongal, Vada', lunch: 'Variety Rice', dinner: 'Dosa, Chutney' },
        { day: 'Wednesday', breakfast: 'Poori, Masala', lunch: 'Rice, Sambar, Poriyal', dinner: 'Fried Rice' },
        { day: 'Thursday', breakfast: 'Bread, Omelette', lunch: 'Rice, Rasam', dinner: 'Phulka, Dal Fry' },
        { day: 'Friday', breakfast: 'Dosa, Sambar', lunch: 'Biryani, Raitha', dinner: 'Noodles' },
        { day: 'Saturday', breakfast: 'Corn Flakes', lunch: 'Rice, Mixed Veg', dinner: 'Aloo Paratha' },
        { day: 'Sunday', breakfast: 'Chole Bhature', lunch: 'Special Lunch', dinner: 'Sandwich' },
    ];

    return (
        <div className="module-container">
            <header className="module-header">
                <h1>Hostel & Mess</h1>
            </header>

            <section className="info-cards">
                <div className="info-card laundry">
                    <h3>🧺 Laundry Timings</h3>
                    <p className="highlight">08:00 AM - 06:00 PM</p>
                    <p>Closed on Sundays</p>
                    <div className="status open">Currently Open</div>
                </div>

                <div className="info-card announcements">
                    <h3>📢 Announcements</h3>
                    <ul>
                        <li>Water supply maintenance on Saturday, 10 AM - 2 PM.</li>
                        <li>Turn off ACs before leaving the room.</li>
                    </ul>
                </div>
            </section>

            <section className="mess-menu">
                <h2>Weekly Mess Menu</h2>
                <div className="table-responsive">
                    <table className="menu-table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Breakfast</th>
                                <th>Lunch</th>
                                <th>Dinner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messMenu.map((item) => (
                                <tr key={item.day}>
                                    <td className="day-col">{item.day}</td>
                                    <td>{item.breakfast}</td>
                                    <td>{item.lunch}</td>
                                    <td>{item.dinner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <style>{`
        .module-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .module-header {
           margin-bottom: 2rem;
        }
        .module-header h1 {
           color: hsl(var(--priority-medium));
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-card {
           background: white;
           padding: 1.5rem;
           border-radius: var(--radius-lg);
           box-shadow: var(--shadow-sm);
        }

        .info-card h3 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .highlight {
          font-size: 1.25rem;
          font-weight: 700;
          color: hsl(var(--text-main));
          margin-bottom: 0.5rem;
        }

        .status {
          display: inline-block;
          margin-top: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status.open {
          background: #dcfce7;
          color: #166534;
        }

        .announcements ul {
          list-style: disc inside;
          color: hsl(var(--text-muted));
        }
        .announcements li {
          margin-bottom: 0.5rem;
        }

        .mess-menu h2 {
          margin-bottom: 1rem;
        }

        .table-responsive {
          background: white;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .menu-table {
          width: 100%;
          border-collapse: collapse;
        }

        .menu-table th, .menu-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #f1f5f9;
        }

        .menu-table th {
          background: #f8fafc;
          font-weight: 600;
          color: hsl(var(--text-muted));
        }

        .day-col {
          font-weight: 500;
          color: hsl(var(--primary));
        }
      `}</style>
        </div>
    );
};

export default Hostel;
