import { useState, useEffect } from 'react';

const useEventCriteria = (eventId) => {
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventCriteria = async () => {
    try {
      const response = await fetch(`/api/event/criteria/get/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event criteria');
      }
      const data = await response.json();
      setCriteria(data.criteria);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventCriteria();
    }
  }, [eventId]);

  return { criteria, setCriteria, loading, error };
};

export default useEventCriteria;

