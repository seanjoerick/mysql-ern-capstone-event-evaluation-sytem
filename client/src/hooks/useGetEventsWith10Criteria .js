import { useState, useEffect } from 'react';

const useEventsWith10Criteria = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/event/get10'); 

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setEvents(data.events);
            } catch (err) {
                setError(err);
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading, error };
};

export default useEventsWith10Criteria;
