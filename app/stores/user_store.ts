import {create} from "zustand";
import {type User} from "~/models/user_model";
import {userService} from "~/services/user_service";

interface UserStoreType {
    users: User[];

    selectedUser: User | undefined;
    selectedUserId: number;

    // activeUsers: User[];
    fetchUsers: () => Promise<User[]>;

    selectUser: (id: number) => User;

    addUser: (user: User, password:string) => Promise<void>;
    // update, delete(deactivate)

    filteredUsers: User[];
    filter: UserFilter,
    applyFilter: (filter: UserFilter) => User[];
    clearFilter: () => void;

    loading: boolean;
}

export class UserFilter {
    static cleanFilter = new UserFilter('','','', null);

    name: string = '';
    email: string = '';
    role: string = '';
    active: boolean | null = null;

    constructor(name: string, email: string, role: string, active: boolean | null) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.active = active;
    }
}


export const useUserStore = create<UserStoreType>((set, get) => ({
    users: [],

    selectedUser: undefined,
    selectedUserId: -1,  // -1 is code for unselected

    filteredUsers: [],
    filter: UserFilter.cleanFilter,

    loading: false,

    fetchUsers: async () => {
        if (get().users.length) {
            return get().users;
        }
        console.log('fetch')
        set({loading: true});
        const users = await userService.fetchUsers();
        const filteredUsers = users;
        if (get().selectedUserId !== -1) {
            get().selectUser(get().selectedUserId)
        }
        set({users, filteredUsers, loading: false});
        return users;
    },

    selectUser: (id: number) => {
        const selectedUser = get().users[id]
        set({selectedUser, selectedUserId: id})
        return selectedUser
    },

    addUser: async (user: User, password: string) => {
        // do not have user passwords in frontend
        await userService.createUser(user, password);
        set((state) => ({users: [...state.users, user]}))
        get().applyFilter(get().filter);
    },

    applyFilter: (filter) => {
        const {name, email, role, active} = filter;
        const filteredUsers = get().users.filter((u) => {
            const nameMatch = !name || u.name.toLowerCase().includes(name.toLowerCase());
            const emailMatch = !email || u.email.toLowerCase().includes(email.toLowerCase());
            const roleMatch = !role || u.role === role;
            const activeMatch = active === null || u.isActive === active;
            return nameMatch && emailMatch && roleMatch && activeMatch;
        });
        set({filteredUsers, filter});

        return filteredUsers;
    },

    clearFilter: () => {
        set({filteredUsers: get().users, filter: UserFilter.cleanFilter});
    }
}))
