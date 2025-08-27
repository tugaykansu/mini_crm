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
        if (!validate()) {
            return;
        }
        await useUserStore.getState().addUser(new User(
            useUserStore.getState().users.length,
            name,
            email,
            role,
            new Date(),
            true,
            Math.random() * 6 + 36,
            Math.random() * 18 + 26
        ), password);
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
                    {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
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
                    {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
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
                                    checked={active === true}
                                    onChange={() => setActive(!active)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm">Active</span>
                            </label>
                        </div>
                    </label>
                    <input type="submit"/>
                </form>


                <button onClick={onSubmit}>Submit</button>
                <span style={{width: 30}}></span>
                <button onClick={() => navigate("/users")}>Close</button>
            </div>
        </div>
    );
}
