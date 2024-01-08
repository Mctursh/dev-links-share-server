import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserPayload, addPlatformPayload, responseObect, UserPlatforms, LoginUserPayload, updateUserPayload } from "./dto/user.dto";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Request, Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Post('create')
    async creatNewUser(@Body() createUserPayload: CreateUserPayload ){
        try {
            await this.userService.createNewUser(createUserPayload)
            return { message: 'Successfully created user'}
        } catch (error) {
            if (error.response == 'Conflict') {
                throw new HttpException('User already exist', HttpStatus.CONFLICT)
            } else {
                throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
            }
        }
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') userName: string): Promise<responseObect> {
        try {
            const data = await this.userService.getUserByUsername(userName)
            return { message: 'Successfully found user', data }
        } catch (error) {
            if (error.response == 'Not Found') {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            } else {
                throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
            }
        }        
    }

    @UseGuards(AuthGuard)
    @Post('add-platform/:id')
    async addPlatform(@Param('id') userName: string, @Body() platform: addPlatformPayload): Promise<responseObect> {
        try {
            const unSerializedPlatforms: UserPlatforms[] = JSON.parse(platform.data) 
            await this.userService.addPlatformToUser( userName, unSerializedPlatforms)
            return { message: 'Successfully added platform' }
        } catch (error) {
            if (error.response == 'Not Found') {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            } else {
                throw new HttpException(error._message , HttpStatus.BAD_REQUEST)
            }
        }
    }

    @Post('login')
    async loginUser(
            @Body() loginUserPayload: LoginUserPayload,
            @Res({ passthrough: true }) response: Response,
        ): Promise<responseObect> {
        try {
            const { password, ...data } = await this.userService.loginUser(loginUserPayload)
            const payload = { sub: data['_id'], userName: data.userName };
            const token = await this.userService.signUserdataWithJwt(payload)
            response.cookie('access_token', token, { httpOnly: true,  maxAge: 60 * 60 * 1000, secure: true})
            return { message: 'Login Successful', data: { ...data, token } }
        } catch (error) {
            throw error
        }
    }

    @UseGuards(AuthGuard)
    @Post('update/:id')
    @UseInterceptors(FileInterceptor('file'))
    async updateUser(
        @Param('id') userName: string,
        @Body() userData: updateUserPayload,
        @UploadedFile() file: Express.Multer.File
        ): Promise<responseObect> {
        try {
            const { password, ...data } = await this.userService.updateUser(userName, userData, file)
            return { message: 'Successfully updated user', data }
        } catch (error) {
            throw error
        }
    }
}
