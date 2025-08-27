import {useState} from "react";
import {User, UserRole} from "~/models/user";
import {capitalizeFirst, validateEmail, validateName} from "~/utils/utils";
import {useNavigate} from "react-router";
import {useUserStore} from "~/stores/user_store";

export default function AddUser() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(UserRole.USER);

    function validate() {
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);

        if (!isNameValid) {
            // todo red borders from bootstrap
        }

        return isNameValid && isEmailValid;
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
        ));
        e.preventDefault();
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
                                setEmail(e.target.value)
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
                    <input type="submit"/>
                </form>


                <button onClick={() => navigate("/users")}>Close</button>
            </div>
        </div>
    );
}
