// This file is NOT for production

import {UserRole} from "~/models/user_model";

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function emailFromName(name: string): string{
    return name.replace(/\s/g, ".").toLowerCase() + '@minicrm.com';
}

export function userRoleFromId(id: number): string{
    if (id === 0){
        return UserRole.OWNER
    } else if (id === 1 || id === 12 || id === 123) {
        return UserRole.ADMIN;
    } else {
        return UserRole.USER;
    }
}

export function isActiveFromId(id: number): boolean{
    return !(id > 10 && id < 120 && id % 3 == 10)
}

export function latitudeAndLongitude(): [number, number] {
    return [Math.random() * 6 + 36, Math.random() * 18 + 26]
}


