import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { CreateUserPayload } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService
        ){}

    async createNewUser(createUserPayload: CreateUserPayload): Promise<User> {
        //check if email in lowercase exist
        const userExist = await this.userModel.find({ email: createUserPayload.email })
        if (userExist.length) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT)
        }

        //email does not exist in database yet
        const saltRounds = Number(this.configService.get<string>('SALT_ROUNDS'))
        createUserPayload.password = await bcrypt.hash(createUserPayload.password, saltRounds)

        const createdUser = new this.userModel(createUserPayload);
        await createdUser.save();
        return createdUser
    }
}