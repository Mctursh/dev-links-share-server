import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { PlatformService } from "./platform.service";
import { CreatePlatformPayload } from "./dto/platform.dto";


@Controller('platform')
export class PlatformController {
    constructor(
        private platformService: PlatformService 
    ){}

    @Get('all')
    async getAllPlatforms() {
        try {
            const data = await this.platformService.getAllPlatforms() 
            return { message: 'Success', data }
        } catch (error) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
        }
    }

    @Post('bulk-create')
    async addBulkPlatform(@Body() platforms: CreatePlatformPayload) {
        try {
            const unSerializedPlatforms: CreatePlatformPayload[] = JSON.parse(platforms.data)
            await this.platformService.addBulkPlatform(unSerializedPlatforms)
            return { message: 'Successfully added platforms' }
        } catch (error) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)   
        }
    }
}