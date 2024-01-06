import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { UserService } from "./user.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        CloudinaryModule
    ],
    providers: [UserService],
})

export class UserModule { }