import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>

            <style>{`
        .app-layout {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          margin-left: 250px;
          flex: 1;
          padding: 2rem;
          background-color: hsl(var(--bg-body));
          min-height: 100vh;
        }
      `}</style>
        </div>
    );
};

export default Layout;
