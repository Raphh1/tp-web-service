import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Fields are filled by Mongoose, never by a constructor: hence the `!`
@Schema({ timestamps: true })
export class Recipe {
  createdAt!: Date;

  @Prop({ default: [], type: [String] })
  ingredients!: string[];

  /** Id of the author in the user service: no join between two databases */
  @Prop({ index: true, required: true })
  ownerId!: string;

  @Prop({ default: [], type: [String] })
  steps!: string[];

  @Prop({ required: true, trim: true })
  title!: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
