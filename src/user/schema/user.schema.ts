import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserPlatforms } from "../dto/user.dto";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true, validateBeforeSave: true })
export class User {
    @Prop({required: true})
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    userName: string

    @Prop()
    firstName: string
    
    @Prop()
    lastName: string
    
    @Prop()
    profilePicture: string

    @Prop({ validate: userPlatformsValidator })
    userPlatforms: UserPlatforms[]
}

function userPlatformsValidator(userPlatforms: UserPlatforms[]): boolean {
    return userPlatforms.every((platform) => {
        userPlatforms.some
        const keys = Object.keys(platform)
        if (keys.includes('id') && keys.includes('link') && keys.length === 2) {
            return true
        } else {
            return false
        }
    });
  }

export const UserSchema = SchemaFactory.createForClass(User)