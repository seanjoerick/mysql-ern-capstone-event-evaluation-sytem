import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login =  async ({ email, password }) => {
        setLoading(true); 
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({ email, password}),
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.error);

             //local storage
             localStorage.setItem('current-user', JSON.stringify(data));
             //context
             setAuthUser(data);

            toast.success('Login successful');
            return data;
        } catch (error) {
            toast.error(error.message || 'Login failed! Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return { loading, login};

};

export default useLogin;
