import { Module } from "@nestjs/common";
import { PlatformService } from "./platform.service";



@Module({
    providers: [PlatformService]
})

export class PlatformModule {}