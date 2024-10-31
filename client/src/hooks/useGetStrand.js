import { useState, useEffect } from 'react';

const useGetstrand = () => {
  const [strands, setStrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStrands = async () => {
      try {
        const response = await fetch('/api/course/strand/get');
        if (!response.ok) throw new Error('Failed to fetch strands');

        const data = await response.json();
        setStrands(data.strand);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStrands();
  }, []);

  return { strands, setStrands, loading, error };
};

export default useGetstrand;
