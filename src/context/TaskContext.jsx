import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    // Initial dummy data for demonstration
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Operating Systems Assignment',
            description: 'Complete the process scheduling simulation.',
            date: '2026-02-05',
            time: '23:59',
            priority: 'high',
            category: 'Academics',
        },
        {
            id: 2,
            title: 'Club Meeting',
            description: 'Discuss technical fest events.',
            date: '2026-02-02',
            time: '18:00',
            priority: 'medium',
            category: 'Clubs',
        },
        {
            id: 3,
            title: 'Laundry Pickup',
            description: 'Pick up clothes from laundry service.',
            date: '2026-02-01',
            time: '10:00',
            priority: 'low',
            category: 'Hostel',
        }
    ]);


    const [userProfile, setUserProfile] = useState({
        name: 'Ananya Desai',
        regNo: '23BCE1045',
        branch: 'B.Tech Computer Science',
        email: 'ananya.desai2023@vitstudent.ac.in',
        phone: '+91 98765 43210',
        hostelBlock: 'G-Block',
        roomNo: '304',
        proctor: 'Prof. Ramesh Kumar'
    });

    const updateUserProfile = (newProfile) => {
        setUserProfile((prev) => ({ ...prev, ...newProfile }));
    };

    const [events, setEvents] = useState([
        {
            id: 101,
            title: 'Riviera 2026 Opening Ceremony',
            date: '2026-02-15',
            location: 'Main Auditorium',
            description: 'The annual cultural fest begins!',
        }
    ]);

    const [myClubs, setMyClubs] = useState([
        { id: 1, name: 'GDSC', description: 'Developer Student Clubs' },
        { id: 2, name: 'Dance Club', description: 'Cultural Club' }
    ]);

    const addClub = (club) => {
        setMyClubs(prev => [...prev, { ...club, id: Date.now() }]);
    };

    const addTask = (task) => {
        setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    };

    const removeTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const addEvent = (event) => {
        setEvents((prev) => [...prev, { ...event, id: Date.now() }]);
    };

    // Helper to get color based on priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'hsl(var(--priority-high))';
            case 'medium': return 'hsl(var(--priority-medium))';
            case 'low': return 'hsl(var(--priority-low))';
            default: return 'hsl(var(--text-muted))';
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, events, userProfile, myClubs, addTask, removeTask, addEvent, updateUserProfile, addClub, getPriorityColor }}>
            {children}
        </TaskContext.Provider>
    );
};
