import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type PlatformDocument = HydratedDocument<Platform>

@Schema()
export class Platform {
    @Prop({ required: true })
    id: number
    
    @Prop({ required: true })
    name: string
}

export const PlatformSchema = SchemaFactory.createForClass(Platform)