import { Controller, Get, InternalServerErrorException, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { responseObect } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Get('checkLogin')
    async checkUserAuth(@Req() request: Request): Promise<responseObect> {
        try {
            const token = request.cookies['access_token']
            if(!token) throw new UnauthorizedException()
            const claims = await this.authService.verifyJwt(token)
            return { message: "User Authenticated", data: claims, }
        } catch (error) {
            throw new UnauthorizedException('User session expired')
        }
    }

    @Get('logout')
    async logout(@Res({ passthrough: true }) response: Response): Promise<responseObect> {
        try {
            response.cookie('access_token', "", { maxAge: 0 })
            return { message: 'Successfully logged out' }
        } catch (error) {
            throw new InternalServerErrorException('Failed to logout')
        }
    }

}
