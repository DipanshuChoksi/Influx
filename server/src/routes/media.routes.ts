import { Router } from 'express';
import { getAllMovies, getAllTvShows, getMovieById } from '../controllers/media.controller';

const router = Router();

router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.get('/tv-shows', getAllTvShows);

export default router;
