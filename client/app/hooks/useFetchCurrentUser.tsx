"use client";

import { useEffect, useState } from "react";
import useUser from "../contexts/user.context";
import { fetchClientCurrentUser } from "../http/user.client.http";

export const useFetchCurrentUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const data = await fetchClientCurrentUser();
      if (data) {
        setUser(data);
        setLoading(false);
      } else {
        setError(new Error("User not found"));
        setLoading(false);
      }
    };
    getUser();
  }, []);
  return { loading, error };
};
