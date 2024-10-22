import { useEffect, useState } from 'react';

const useGetCriteriaById = (eventId) => {
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventCriteriaById = async () => {
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

    if (eventId) {
        fetchEventCriteriaById();
    }
  }, [eventId]);

  return { criteria, setCriteria, loading, error };
};

export default useGetCriteriaById;
