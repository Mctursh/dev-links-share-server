import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { CreateUserPayload, LoginUserPayload, UserPlatforms, updateUserPayload } from "./dto/user.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService,
        private cloudinaryService: CloudinaryService
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

    async getUserByUsername(userName: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ userName }).lean()
            if (!user) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
            }
            return user
        } catch (error) {
            throw error
        }
    }
    
    async addPlatformToUser(userName: string, plarformObjects: UserPlatforms[]): Promise<User> {
        try {
            const user = await this.userModel.findOne({ userName })
            if(!user) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
            }
            user.userPlatforms = plarformObjects
            await user.save()
            return user
            
        } catch (error) {
            throw error
        }
    }

    async loginUser(userData: LoginUserPayload): Promise<User> {
        try {
            const foundUser = await this.userModel.findOne({ userName: userData.userName }).lean()
            if (!foundUser) {
              throw new NotFoundException('User not found')
            } else {
              const isMatch = await bcrypt.compare(userData.password, foundUser.password)
              if (!isMatch) {
                throw new UnauthorizedException('Wrong password')
              } else {
                return foundUser
              }
            }
          } catch (error) {
            throw error
          }        
    }

    async updateUser(
        userName: string,
        userData: updateUserPayload,
        file?: Express.Multer.File
        ): Promise<User> {
        try {
            const user = await this.userModel.findOne({ userName })
            if (!user) {
                throw new NotFoundException('User not found')
            }
            let response: UploadApiResponse | UploadApiErrorResponse
            if(file){
                response = await this.cloudinaryService.uploadImage(file)
            }
            user.firstName = userData?.firstName || user.firstName
            user.lastName = userData?.lastName || user.lastName
            user.email = userData?.email || user.email
            if(response){
                user.profilePicture = response.secure_url
            }
            const userOut = await user.save()            
            return userOut.toObject()
        } catch (error) {
            throw error
        }
    }
    
}