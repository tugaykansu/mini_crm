import {User} from "~/models/user";
import {faker} from '@faker-js/faker';
import {emailFromName, isActiveFromId, latitudeAndLongitude, timeout, userRoleFromId} from "~/utils/demo_utils";

class UserService {
    async fetchUsers() {
        await timeout(2000)
        const users = [];
        const len = 50;
        for (var i = 0; i < len; i++) {
            const id = i;
            const name = faker.person.fullName();
            const email = emailFromName(name);
            const role = userRoleFromId(id);
            const creationDate = faker.date.between({from: new Date("2023"), to: new Date("2025-08-25")});
            const isActive = isActiveFromId(id);
            const [latitude, longitude] = latitudeAndLongitude();

            users.push(new User(
                id,
                name,
                email,
                role,
                creationDate,
                isActive,
                latitude,
                longitude));
        }

        const persistentUserRegex = /^user_[0-9]+$/i;
        for (const key in localStorage){
            if( persistentUserRegex.test(key)){
                users.push(JSON.parse(key))
            }
        }

        return users;
    }

    async createUser(user: User) {
        await timeout(1000)
        localStorage.setItem("user" + user.id, JSON.stringify(user));
    }

    // update, delete(deactivate)
}

export const userService = new UserService();
