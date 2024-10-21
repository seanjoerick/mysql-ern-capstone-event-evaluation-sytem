import { useState, useEffect } from 'react';

const useGetEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/get');
        if (!response.ok) throw new Error('Failed to fetch events');

        const data = await response.json();
        setEvents(data.events);
        setCount(data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, setEvents, count, loading, error };
};

export default useGetEvents;
