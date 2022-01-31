import { useQuery } from "react-query";
import axios from "axios";
import { Tag } from "../types/types";

export const useQueryTags = () => {
  const getTags = async () => {
    const { data } = await axios.get<Tag[]>("http://127.0.0.1:3000/tags");
    return data;
  };

  return useQuery<Tag[] | Error>({
    queryKey: "tags",
    queryFn: getTags,
    staleTime: 60000,
  });
};
