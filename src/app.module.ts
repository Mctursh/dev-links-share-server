import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PlatformModule } from './platform/platform.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UserModule,
    PlatformModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_ADMIN_NAME}:${process.env.MONGO_ADMIN_PASSWORD}@cluster0.4d1r2.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`),
    CloudinaryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
