import { Module } from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { PlatformController } from "./platform.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Platform, PlatformSchema } from "./schema/platform.schema";



@Module({
    providers: [PlatformService],
    controllers: [PlatformController],
    imports: [
        MongooseModule.forFeature([{name: Platform.name, schema: PlatformSchema}])
    ]
})

export class PlatformModule {}