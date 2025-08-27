import {useState} from "react";
import {User, UserRole} from "~/models/user_model";
import {capitalizeFirst, validateEmail, validateName, validatePassword} from "~/utils/utils";
import {useNavigate} from "react-router";
import {useUserStore} from "~/stores/user_store";

export default function AddUserModal() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(UserRole.USER);
    const [active, setActive] = useState<boolean>(true);

    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    function validate() {
        const nameError = validateName(name);
        const passwordError = validatePassword(password);
        const emailError = validateEmail(email);

        setNameError(nameError);
        setPasswordError(passwordError);
        setEmailError(emailError);

        return !nameError && !passwordError && !emailError;
    }

    async function onSubmit(e: any) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        await useUserStore.getState().addUser(new User(
            useUserStore.getState().users.length,
            name,
            email,
            role,
            new Date(),
            active,
            Math.random() * 6 + 36,
            Math.random() * 18 + 26
        ), password);
        navigate("/users");
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-xl shadow-xl">
                <div className="w-100 flex justify-between items-center">
                    <h2>Add User</h2>
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
                    {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
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
                    {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-300 mb-2">Password:</span>
                        <input
                            id="password"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </label>
                    {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
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

                    <label className="block">
                        <span className="block text-sm font-medium text-gray-300 mb-2">Active Status:</span>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="active"
                                    checked={active === true}
                                    onChange={() => setActive(true)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">Active</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="active"
                                    checked={active === false}
                                    onChange={() => setActive(false)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">Inactive</span>
                            </label>
                        </div>
                    </label>
                    <div className="pt-4">
                        <button 
                            onClick={onSubmit}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>



            </div>
        </div>
    );
}
