// import { useState, useEffect } from 'react';

// const useEventsSummary = () => {
//     const [data, setData] = useState({ completedEvents: [], upcomingEvents: [] });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEventsSummary = async () => {
//             try {
//                 const response = await fetch('/api/event/geteventsummary');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch events summary');
//                 }
//                 const result = await response.json();
//                 setData({
//                     completedEvents: result.completedEvents,
//                     upcomingEvents: result.upcomingEvents,
//                 });
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEventsSummary();
//     }, []);

//     return { data, loading, error };
// };

// export default useEventsSummary;
import { useState, useEffect } from 'react';

const useEventsSummary = () => {
  const [data, setData] = useState({ completedEvents: [], upcomingEvents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventsSummary = async () => {
      try {
        const response = await fetch('/api/event/geteventsummary');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch events summary');
        }

        const completedEvents = result.completedEvents.map(event => ({
          id: event.event_id,
          title: event.event_title,
          endDate: event.end_date,
          createdBy: event.created_by,
        }));

        const upcomingEvents = result.upcomingEvents.map(event => ({
          id: event.event_id,
          title: event.event_title,
          startDate: event.start_date,
          organizers: event.created_by,
        }));

        setData({ completedEvents, upcomingEvents });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsSummary();
  }, []);

  return { data, loading, error };
};

export default useEventsSummary;
