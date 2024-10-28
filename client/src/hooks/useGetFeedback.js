import { useState, useEffect } from 'react';

const useEventFeedback = (eventId) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventFeedback = async () => {
    try {
      const response = await fetch(`/api/event/criteria/feedback/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event feedback');
      }
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventFeedback();
    }
  }, [eventId]);

  return { feedback, loading, error };
};

export default useEventFeedback;
