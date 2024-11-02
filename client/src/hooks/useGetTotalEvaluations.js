import { useState, useEffect } from 'react';

const useGetTotalEvaluations = () => {
  const [totalEvaluations, setTotalEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalEvaluations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/event/evaluations/results/total-evaluations');
        if (!response.ok) {
          throw new Error('Failed to fetch total evaluations');
        }
        const data = await response.json();
        setTotalEvaluations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalEvaluations();
  }, []); // Empty dependency array to run only on mount

  return { totalEvaluations, loading, error };
};

export default useGetTotalEvaluations;
