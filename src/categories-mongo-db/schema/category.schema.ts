/* eslint-disable prettier/prettier */
//!Schema MongoDB like Entity PostgreSQL:
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {

    @Prop()
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Prop([String])
    favorites: string[]

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) //Relation
    // user: User;

    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]}) //Relation
    // user: User[];

    // @Prop(raw({
    //     firstname: {type: String},
    //     lastname: { type: String }
    // }))
    // details: Record<string, any>

}

export const CategorySchema = SchemaFactory.createForClass(Category)
