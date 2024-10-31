import { useState, useEffect } from 'react';

const useGetCollege = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch('/api/course/get');
        if (!response.ok) throw new Error('Failed to fetch college');

        const data = await response.json();
        setCourses(data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, []);

  return { courses, setCourses, loading, error };
};

export default useGetCollege;
