import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface placesPostsData {
  id: number;
  nickname: string;
  profileimg: string;
  createdat: string;
  title: string;
  content: string;
  star: number;
  likes: number;
  comments: Array<Comments>;
}

interface Comments {
  commentId: number;
  nickname: string;
  profileimg: string;
  comment: string;
  createdat: string;
}

interface getPlacesPostReturn {
  placesPostsData: placesPostsData | null;
  loading: boolean;
  error: Error | null;
}

const getPlacesPost = (url: string): getPlacesPostReturn => {
  const [placesPostsData, setPlacesPostsData] = useState<placesPostsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const axiosData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<placesPostsData>(url);
      setPlacesPostsData(response.data);
    } catch (error) {
      setError(Object.assign(new Error(), error));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return { placesPostsData, loading, error };
};

export default getPlacesPost;
