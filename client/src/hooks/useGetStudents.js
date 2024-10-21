import { useState, useEffect } from 'react';

const useGetStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/user/students/all');
        if (!response.ok) throw new Error('Error fetching students');
        
        const data = await response.json();
        setStudents(data.students);
        setCount(data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, setStudents, count, loading, error };
};

export default useGetStudents;
