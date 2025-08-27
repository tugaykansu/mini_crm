export enum UserRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    USER = 'user'
}

export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    creationDate: Date;
    isActive: boolean;
    latitude: number;
    longitude: number;

    constructor(id: number, name: string, email: string, role: string, creationDate: Date, isActive: boolean, latitude: number, longitude: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.creationDate = creationDate;
        this.isActive = isActive;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
