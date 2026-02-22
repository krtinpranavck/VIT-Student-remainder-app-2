import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Academics from './pages/Academics';
import Events from './pages/Events';
import Clubs from './pages/Clubs';
import Hostel from './pages/Hostel';
import Profile from './pages/Profile';

import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="academics" element={<Academics />} />
            <Route path="events" element={<Events />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="hostel" element={<Hostel />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
