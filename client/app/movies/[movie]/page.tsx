import { redirect } from "next/navigation";
import MovieDetailClient from "../../components/ui/MovieDetailClient";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const { movie } = await params;
  const user = {
    name: "Dipanshu choksi",
    email: "dipanshu@example.com",
  };

  if (!user) {
    redirect("/signin");
  }

  // Decoding the movie title from URL
  const movieTitle = decodeURIComponent(movie);

  return <MovieDetailClient movieTitle={movieTitle} user={user} />;
}
