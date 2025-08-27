import {User} from "~/models/user_model";
import {faker} from '@faker-js/faker';
import {emailFromName, isActiveFromId, latitudeAndLongitude, timeout, userRoleFromId} from "~/utils/demo_utils";
import {simpleHash} from "~/utils/utils";

class UserService {
    async fetchUsers() {
        await timeout(2000)
        const users = [];
        const len = 5000;
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
                users.push(User.parse(localStorage.getItem(key)!))
            }
        }

        return users.sort((a, b) => a.id - b.id);
    }

    async createUser(user: User, password: string) {
        // do not have user passwords in frontend
        await timeout(1000)
        localStorage.setItem("user_" + user.id, JSON.stringify({...user, password: simpleHash(password)}));
    }

    // update, delete(deactivate)
}

export const userService = new UserService();
