"use client";

import { useEffect, useState } from "react";
import useUser from "../contexts/user.context";
import { fetchClientCurrentUser } from "../http/user.client.http";
import { socket } from "../utils/socket";

export const useFetchCurrentUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        setLoading(false);
        socket.connect();
        return;
      }
      setLoading(true);
      const data = await fetchClientCurrentUser();
      if (data) {
        setUser(data);
        setLoading(false);
        socket.connect();
      } else {
        setError(new Error("User not found"));
        setLoading(false);
      }
    };
    getUser();
  }, []);
  return { loading, error };
};
