import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { userJwtData } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async verifyJwt(token: string): Promise<userJwtData> {
        return await this.jwtService.verifyAsync(
            token,
            {
              secret: this.configService.get<string>('JWT_SECRET')
            }
          );
    }
}
