import {useEffect, useState} from "react";
import type {User} from "~/models/user";
import {Outlet, useNavigate} from "react-router";
import {useUserStore} from "~/stores/user_store";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        useUserStore.getState().fetchUsers().then((_) => setUsers(_));
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <div className="relative p-6">
                <h1 className="text-xl font-bold">Users</h1>
                <ol className="p-4">
                    {users.map((user, i) => (
                        <li key={i} className="p-2 border-b"
                        onClick={() => navigate(`/users/${i}`)}>
                            {Object.values(user).join(" - ")}
                        </li>
                    ))}
                </ol>

                <button
                    onClick={() => navigate("/users/add-user")}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center hover:bg-blue-700"
                >
                    +
                </button>

                <Outlet />

                {/* Alternatively, you can check location.pathname === "/users/add-user" */}
            </div>
        </>
    );
}

