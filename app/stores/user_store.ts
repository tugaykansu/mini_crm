import {create} from "zustand";
import {type User} from "~/models/user";
import {userService} from "~/services/user_service";

interface UserStoreType {
    users: User[];

    selectedUser: User | undefined;
    selectedUserId: number;

    // activeUsers: User[];
    fetchUsers: () => Promise<User[]>;

    selectUser: (id: number) => User;

    addUser: (user: User) => Promise<void>;
    // update, delete(deactivate)

    filteredUsers: User[];
    filter: UserFilter,
    applyFilter: (filter: UserFilter) => User[];
    clearFilter: () => void;

    loading: boolean;
}

class UserFilter {
    static cleanFilter = new UserFilter();

    name: string = '';
    role: string = '';

    constructor() {
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

        set({loading: true});
        const users = await userService.fetchUsers();
        const filteredUsers = await userService.fetchUsers();
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

    addUser: async (user: User) => {
        set((state) => ({users: [...state.users, user]}))
        get().applyFilter(get().filter);
    },

    applyFilter: (filter) => {
        const {name, role} = filter;
        const filteredUsers = get().users.filter((u) => {
            const nameMatch = !name || u.name.toLowerCase().includes(name.toLowerCase());
            const roleMatch = !role || u.role === role;
            return nameMatch && roleMatch;
        });
        set({filteredUsers});

        return filteredUsers;
    },

    clearFilter: () => {
        set({filteredUsers: get().users, filter: UserFilter.cleanFilter});
    }
}))
