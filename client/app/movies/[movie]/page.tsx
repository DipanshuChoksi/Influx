import MovieDetailClient from '../../components/ui/MovieDetailClient';

export default async function MovieDetailPage({ params }: { params: Promise<{ movie: string }> }) {
  const { movie: movieId } = await params;

  return <MovieDetailClient movieId={movieId} />;
}
