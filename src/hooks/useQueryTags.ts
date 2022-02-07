import { useQuery } from "react-query";
import axios from "axios";
import { Tag } from "../types/types";

// タグはリアルタイム制は不要なので
export const useQueryTags = () => {
  // APIコール
  const getTags = async () => {
    const { data } = await axios.get("http://localhost:3000/tags");
    return data;
  };

  // タグに関してはほとんど変更がない前提
  return useQuery<Tag[]>({
    queryKey: "tags",
    queryFn: getTags,
    staleTime: 60000,
  });
};
