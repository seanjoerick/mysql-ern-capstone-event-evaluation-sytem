import { useState, useEffect } from 'react';

const useGetTesda = () => {
  const [tcourses, setTCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTesda = async () => {
      try {
        const response = await fetch('/api/course/tesda/get');
        if (!response.ok) throw new Error('Failed to fetch tesda');

        const data = await response.json();
        setTCourses(data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTesda();
  }, []);

  return { tcourses, setTCourses, loading, error };
};

export default useGetTesda;
