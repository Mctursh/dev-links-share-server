import { ObjectId } from "mongoose";

export class User {
    _id: ObjectId
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    userName: string;
    platform: Array<string>;
}

export class CreateUserPayload {
    email: string;
    password: string;
    userName: string
}

export class UserPlatforms {
    id: number;
    link: string
}


export class responseObect {
    message: string
    data?: object
}

export class addPlatformPayload {
    data: string
}

export class LoginUserPayload {
    userName: string
    password: string
}

export class updateUserPayload {
    firstName?: string
    lastName?: string
    profilePicture?: string
    email?: string
}

export class userJwtData {
    sub: ObjectId
    userName: string
}