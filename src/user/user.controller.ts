import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CreateUserPayload } from "./dto/user.dto";
import { UserService } from "./user.service";


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
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
}
