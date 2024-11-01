import { useEffect, useState } from 'react';

const useGetTopEvents = (year) => {
    const [topEvents, setTopEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/event/evaluations/results/top-events/${year}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTopEvents(data.top_events);
            } catch (err) {
                setError(err.message || "Error fetching top events.");
            } finally {
                setLoading(false);
            }
        };

        if (year) {
            fetchTopEvents();
        }
    }, [year]);

    return { topEvents, loading, error };
};

export default useGetTopEvents;
