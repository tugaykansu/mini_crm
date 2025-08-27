import {useState} from "react";
import {User, UserRole} from "~/models/user_model";
import {capitalizeFirst, validateEmail, validateName} from "~/utils/utils";
import {useNavigate} from "react-router";
import {UserFilter, useUserStore} from "~/stores/user_store";

export default function FilterUsersModal() {
    const navigate = useNavigate();

    const [name, setName] = useState(useUserStore.getState().filter.name);
    const [email, setEmail] = useState(useUserStore.getState().filter.email);
    const [role, setRole] = useState(useUserStore.getState().filter.role);
    const [active, setActive] = useState<boolean | null>(useUserStore.getState().filter.active);

    function onSubmit(e: any) {
        // this form is always valid
        useUserStore.getState().applyFilter(new UserFilter(name, email, role, active));
        e.preventDefault();
        navigate("/users");
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl">
                <h2>Add User</h2>
                <form onSubmit={onSubmit}>
                    <label>Name:
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </label>
                    <label>Email:
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </label>
                    <label>Role:
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value as UserRole);
                            }}
                            className={"w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"}
                        >
                            <option key={UserRole.USER} value={UserRole.USER}>{capitalizeFirst(UserRole.USER)}</option>
                            <option key={UserRole.ADMIN}
                                    value={UserRole.ADMIN}>{capitalizeFirst(UserRole.ADMIN)}</option>
                            <option key={UserRole.OWNER}
                                    value={UserRole.OWNER}>{capitalizeFirst(UserRole.OWNER)}</option>
                        </select>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                        <span>Active Status:</span>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="active"
                                    checked={active === null}
                                    onChange={() => setActive(null)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm">All</span>
                            </label>
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="active"
                                    checked={active === true}
                                    onChange={() => setActive(true)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm">Active</span>
                            </label>
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="active"
                                    checked={active === false}
                                    onChange={() => setActive(false)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm">Inactive</span>
                            </label>
                        </div>
                    </label>

                    <input type="submit"/>
                </form>

                <button onClick={onSubmit}>Filter</button>
                <button onClick={onSubmit}>Clear</button>
                <button onClick={() => navigate("/users")}>Close</button>
            </div>
        </div>
    );
}
