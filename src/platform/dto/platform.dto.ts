import { ObjectId } from "mongoose"

export class Platform {
    id: string
    name: string
    link: string
    _id?: ObjectId
}

export class CreatePlatformPayload extends Platform {
    data: string
}