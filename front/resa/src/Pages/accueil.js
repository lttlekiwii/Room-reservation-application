import axios from 'axios';
import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Accueil = () => {

    const events = [
        { title: 'Réunion A', date: '2024-04-12' },
        { title: 'Réunion B', date: '2024-04-13' },
        // Ajoutez d'autres événements au besoin
      ];
      
    const [formData, setFormData] = useState({
        user: '',
        room: '',
        time: '',
        subject: ''
    });

    const calendarRef = useRef(null);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Submit form data to create reservation
            await axios.post('http://localhost:8000/create_reservation/', formData);
            console.log('Reservation created successfully!');
            // Refresh calendar events after successful reservation creation
            if (calendarRef.current) {
                calendarRef.current.getApi().refetchEvents();
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    // Function to handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h1>Home</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" value={formData.user} onChange={handleChange} placeholder="User ID (1 or 2)" />
                <input type="text" name="room" value={formData.room} onChange={handleChange} placeholder="Room ID | id 1 -> Conference Room | id 2 -> Video Room | id 3 -> Small Room | id 4 -> Oval Room " />
                <input type="text" name="time" value={formData.time} onChange={handleChange} placeholder="Start date and time (YYYY-MM-DD hh:mm)" />
                <input type="text" name="endTime" value={formData.endTime} onChange={handleChange} placeholder="End date and time (YYYY-MM-DD hh:mm)" />
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                <button type="submit">Book</button>
            </form>

            <div>
                {/* Calendar component */}
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events} 
                />
            </div>
        </div>
    );
};

// Function to fetch calendar events
const fetchEvents = async (fetchInfo, successCallback) => {
    try {
        // Fetch reservations from the server
        const response = await axios.get('http://localhost:8000/get_reservations/');
        const reservations = response.data;
        // Map reservations to event objects
        const events = reservations.map((reservation) => ({
            id: reservation.id,
            title: reservation.subject,
            start: reservation.time,
            end: reservation.endTime, // End time of the reservation
            allDay: false // Set to false if reservations are for specific hours
        }));
        successCallback(events);
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }
};

export default Accueil;
