import { useState, useEffect } from 'react';

const useGetAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/user/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch admins');
                }
                const data = await response.json();
                setAdmins(data.admins);
                setCount(data.count);
            } catch (err) {
                setError(err.message || 'Failed to fetch admins.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []); 

    return { admins, setAdmins, count, loading, error };
};

export default useGetAdmins;
