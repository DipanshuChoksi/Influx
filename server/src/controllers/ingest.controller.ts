import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import MovieModel from '../models/media/movie.model';
import TvShowModel from '../models/media/tvshow.model';

// Using absolute path for reliability in local dev
const PROJECT_ROOT = path.join(__dirname, '../../../');
const MEDIA_ROOT = path.join(PROJECT_ROOT, 'server/media');

const isVideoFile = (filename: string) => {
  const videoExtensions = ['.mp4', '.mkv', '.avi', '.webm', '.mov'];
  return videoExtensions.includes(path.extname(filename).toLowerCase());
};

export const ingestMedia = async (req: Request, res: Response) => {
  const { sourcePath } = req.body;

  if (!sourcePath) {
    return res.status(400).json({ message: 'Source path is required' });
  }

  if (!fs.existsSync(sourcePath)) {
    return res.status(400).json({ message: `Source path does not exist: ${sourcePath}` });
  }

  try {
    const items = fs.readdirSync(sourcePath);
    const results = { movies: 0, tvShows: 0, errors: [] as string[] };

    for (const item of items) {
      const fullPath = path.join(sourcePath, item);
      const stats = fs.statSync(fullPath);
      const destDir = path.join(MEDIA_ROOT, 'movies');
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      const destPath = path.join(destDir, item);
      if (isVideoFile(item)) {
        try {
          fs.copyFileSync(fullPath, destPath);
          // Movie

          const movieTitle = path.parse(item).name;
          await MovieModel.findOneAndUpdate(
            { title: movieTitle },
            {
              title: movieTitle,
              videoUrl: `/media/movies/${item}`,
              quality: 'HD',
              rating: '8.5',
            },
            { upsert: true, new: true }
          );
          results.movies++;
        } catch (err: any) {
          results.errors.push(`Failed to copy movie ${item}: ${err.message}`);
        }
      }
    }
    //   if (stats.isDirectory()) {
    //     // TV Series
    //     const seriesName = item;
    //     const seriesFiles = fs.readdirSync(fullPath);

    //     let foundEpisode = false;
    //     for (const file of seriesFiles) {
    //       if (isVideoFile(file)) {
    //         const destDir = path.join(MEDIA_ROOT, 'tv-shows', seriesName);
    //         if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    //         const destPath = path.join(destDir, file);
    //         try {
    //           fs.copyFileSync(path.join(fullPath, file), destPath);

    //           await TvShowModel.findOneAndUpdate(
    //             { title: seriesName },
    //             {
    //               title: seriesName,
    //               videoUrl: `/media/tv-shows/${seriesName}/${file}`,
    //               quality: 'HD', // Default
    //               rating: '8.0', // Placeholder
    //             },
    //             { upsert: true, new: true }
    //           );
    //           results.tvShows++;
    //           foundEpisode = true;
    //           break;
    //         } catch (err: any) {
    //           results.errors.push(`Failed to copy TV show ${seriesName}: ${err.message}`);
    //         }
    //       }
    //     }
    //   } else

    res.json({
      success: true,
      message: 'Ingestion process completed',
      summary: results,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Ingestion failed', error: error.message });
  }
};

export const pickFolder = async (req: Request, res: Response) => {
  try {
    // Trigger zenity folder picker
    const selectedPath = execSync('zenity --file-selection --directory --title="Select Media Folder"', {
      encoding: 'utf8',
      env: { ...process.env, DISPLAY: ':0' },
    }).trim();

    res.json({ success: true, path: selectedPath });
  } catch (error: any) {
    res.status(400).json({ success: false, message: 'Folder selection cancelled or failed' });
  }
};
