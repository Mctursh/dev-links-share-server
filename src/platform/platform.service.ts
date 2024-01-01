import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Platform, PlatformDocument } from "./schema/platform.schema";
import { Model } from "mongoose";
import { CreatePlatformPayload } from "./dto/platform.dto";


@Injectable()
export class PlatformService {
    constructor(
        @InjectModel(Platform.name) private platformModel: Model<PlatformDocument>
    ){}

    async addPlatform(createPlatformPayload: CreatePlatformPayload ): Promise<Platform> {
        const platformExist = await this.platformModel.find({ id: createPlatformPayload.id })
        if(platformExist.length){
            throw new HttpException('Conflict', HttpStatus.CONFLICT)
        }

        const newPlatform = new this.platformModel(createPlatformPayload)
        await newPlatform.save()
        return newPlatform
    }

    async addBulkPlatform(bulkPlatform: CreatePlatformPayload[]): Promise<void> {
        try {
            bulkPlatform.forEach(async(plat) => {
                await this.addPlatform(plat)
                console.log(`Successfully added platform with id ${plat.id}`);
            })
        } catch (error) {
            throw error
        }
    }

    async getAllPlatforms(): Promise<Platform[]> {
        const allPlatform = await this.platformModel.find().lean()
        return allPlatform
    }

    async findPlatformById(id: number): Promise<Platform> {
        const platform = await this.platformModel.findOne({ id }).lean()
        return platform
    }
}