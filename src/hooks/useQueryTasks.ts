import { useQuery } from "react-query";
import axios from "axios";
import { Task } from "../types/types";

// apiの呼び出し
export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>("http://127.0.0.1:3000/tasks");
    return data;
  };

  return useQuery<Task[], Error>({
    queryKey: "tasks",
    queryFn: getTasks,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
