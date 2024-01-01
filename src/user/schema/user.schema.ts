import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { userPlatforms } from "../dto/user.dto";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
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

    @Prop()
    userPlatforms: userPlatforms[]
}

export const UserSchema = SchemaFactory.createForClass(User)