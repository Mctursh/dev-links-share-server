import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Platform } from "src/platform/schema/platform.schema";

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
    platformIds: number[]
}

export const UserSchema = SchemaFactory.createForClass(User)