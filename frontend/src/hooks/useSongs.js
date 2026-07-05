import { useEffect, useState } from "react";
import { getSongs } from "../api/songs";

export default function useSongs() {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {
      try {
        const result = await getSongs();
        setSongs(result);
      } finally {
        setLoading(false);
      }
    }

    load();

  }, []);

  return {
    songs,
    loading
  };

}
