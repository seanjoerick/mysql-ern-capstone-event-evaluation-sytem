import { useState, useEffect } from 'react';

const useCheckEvaluation = (eventId) => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/event/evaluations/get/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch evaluation');
        }
        const data = await response.json();
        setEvaluation(data.evaluation);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [eventId]);

  return { evaluation, loading, error };
};

export default useCheckEvaluation;
