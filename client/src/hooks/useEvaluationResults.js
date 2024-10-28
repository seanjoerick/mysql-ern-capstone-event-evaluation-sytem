import { useState, useEffect } from 'react';

const useEvaluationResults = (eventId) => {
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvaluationResults = async () => {
    try {
      const response = await fetch(`/api/event/evaluations/results/get/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch evaluation results');
      }
      const data = await response.json();
      setEvaluationResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvaluationResults();
    }
  }, [eventId]);

  return { evaluationResults, loading, error };
};

export default useEvaluationResults;
