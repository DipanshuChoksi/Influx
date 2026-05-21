import { Schema, model, Document } from 'mongoose';

export interface ITvShow extends Document {
  title: string;
  seasons?: number;
  rating?: string;
  videoUrl: string; // Typically this would be more complex (episodes), but keeping it simple for now
  posterUrl?: string;
  description?: string;
}

const TvShowSchema = new Schema<ITvShow>(
  {
    title: { type: String, required: true },
    seasons: { type: Number },
    rating: { type: String },
    videoUrl: { type: String, required: true },
    posterUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<ITvShow>('TvShow', TvShowSchema);
