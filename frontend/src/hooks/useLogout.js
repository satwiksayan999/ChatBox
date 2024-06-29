import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/user_context";

const useLogout = () => {
    const [loading, setloading] = useState();
    const { setAuthUser } = useAuthContext();

    const LogOut = async () => {
        setloading(true);

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message);

        } finally {
            setloading(false);
        }
    };

    return { loading, LogOut };

}

export default useLogout;