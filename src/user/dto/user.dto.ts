import { ObjectId } from "mongoose";

export class User {
    _id: ObjectId
    email: string;
    hash: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    platform: Array<string>;
}

export class CreateUserPayload {
    email: string;
    password: string;
    userName: string
}

