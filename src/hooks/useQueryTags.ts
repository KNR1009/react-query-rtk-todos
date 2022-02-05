import { useQuery } from "react-query";
import axios from "axios";
import { Tag } from "../types/types";

// タグはリアルタイム制は不要なので
export const useQueryTags = () => {
  // APIコール
  const getTags = async () => {
    const { data } = await axios.get<Tag[]>("http://localhost:3000/tags");
    return data;
  };

  return useQuery<Tag[] | Error>({
    queryKey: "tags",
    queryFn: getTags,
    staleTime: 60000,
  });
};
