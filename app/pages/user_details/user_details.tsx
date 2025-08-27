import {useParams} from "react-router";
import {useUserStore} from "~/stores/user_store";
import {useEffect, useState} from "react";
import type {User} from "~/models/user";

export default function UserDetails() {
    const params = useParams()

    const {loading} = useUserStore();

    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        useUserStore.getState().fetchUsers().then((_) => setUser(useUserStore.getState().selectUser(+(params.id!))));
    }, []);

    if (loading) {
        return (
            <>
                <div className="p-6">
                    <h1 className="text-xl font-bold">Loading...</h1>
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <>
                <div className="p-6">
                    <h1 className="text-xl font-bold">User Not Found</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="relative p-6">
                <h1 className="text-xl font-bold">User Details</h1>
                <div>id : {user.id}</div>
                <div>name : {user.name}</div>
                <div>email : {user.email}</div>
                <div>role : {user.role}</div>
                <div>creationDate : {user.creationDate.toDateString()} {user.creationDate.toTimeString()}</div>
                <div>isActive : {user.isActive}</div>
                <div>latitude : {user.latitude}</div>
                <div>longitude : {user.longitude}</div>
            </div>
        </>
    );
}

