import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary' 

export const Cloudinary: Provider = {
    provide: "Cloudinary",
    useFactory: (configService: ConfigService) => {
        return v2.config({
            cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    },
    inject: [ConfigService], // Specify the Dependency to be Injected
}
