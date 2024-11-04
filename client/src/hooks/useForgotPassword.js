import { useState } from 'react';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const forgotPassword = async (email) => {
        setLoading(true);
        let success = false;

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await response.json();
            toast.success(data.message);
           success = true; 
        } catch (error) {
            toast.error(error.message); 
        } finally {
            setLoading(false);
        }

        return success;
    };

    return { forgotPassword, loading, setLoading };
};

export default useForgotPassword;
