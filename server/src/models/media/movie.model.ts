import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  year?: string;
  rating?: string;
  quality?: string;
  videoUrl: string;
  posterUrl?: string;
  description?: string;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    year: { type: String },
    rating: { type: String },
    quality: { type: String },
    videoUrl: { type: String, required: true },
    posterUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<IMovie>('Movie', MovieSchema);
