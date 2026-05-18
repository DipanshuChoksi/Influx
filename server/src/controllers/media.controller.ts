import { Request, Response } from 'express';
import MovieModel from '../models/media/movie.model';
import TvShowModel from '../models/media/tvshow.model';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await MovieModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: movies });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTvShows = async (req: Request, res: Response) => {
  try {
    const tvShows = await TvShowModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: tvShows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Searching for id:', id);
    const movie = await MovieModel.findById(id);
    console.log('Found movie:', movie);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ success: true, data: movie });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
