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
            <div className="bg-slate-900 p-6 rounded-xl shadow-xl">
                <div className="w-100 flex justify-between items-center">
                    <h2>Filter Users</h2>
                    <button onClick={() => navigate("/users")}>X</button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-300 mb-2">Name:</span>
                        <input
                            id="name"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-300 mb-2">Email:</span>
                        <input
                            id="email"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-300 mb-2">Role:</span>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => {
                                setRole(e.target.value as UserRole);
                            }}
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                    <div className="w-full flex justify-between items-center pt-4">
                        <button 
                            onClick={onSubmit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
                            type="submit"
                        >
                            Filter
                        </button>
                        <button 
                            onClick={() => {
                                useUserStore.getState().clearFilter();
                                setName('');
                                setEmail('');
                                setRole(UserRole.USER);
                                setActive(null);
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
