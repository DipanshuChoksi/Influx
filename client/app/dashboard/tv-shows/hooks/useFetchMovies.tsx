import { getRequest } from '@/app/utils/api';
import { useEffect, useState } from 'react';

function useFetchMovies() {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await getRequest('media/tv-shows');
        setTvShows(res?.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch TV shows:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  return { tvShows, loading };
}

export default useFetchMovies;
