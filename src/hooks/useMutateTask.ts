import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { resetEditedTask } from "../slices/todoSlice";
import { useQueryClient, useMutation } from "react-query";
import { Task, EditTask } from "../types/types";

export const useMutateTask = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // 新規作成
  const createTaskMutation = useMutation(
    (task: Omit<EditTask, "id">) =>
      axios.post<Task>(`http://127.0.0.1:3000/tasks/`, task),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>("tasks", [
            ...previousTodos,
            res.data,
          ]);
        }
        dispatch(resetEditedTask());
      },
    }
  );
  // アップデート
  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(`http://127.0.0.1:3000/tasks/${task.id}`, task),
    {
      // variablesはリクエスト時に渡したtaskの値が入っている
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          );
        }
        dispatch(resetEditedTask());
      },
    }
  );
  // 削除
  const deleteTaskMutation = useMutation(
    (id: number) => axios.delete(`http://127.0.0.1:3000/tasks/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>("tasks");
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTodos.filter((task) => task.id !== variables)
          );
        }
        dispatch(resetEditedTask());
      },
    }
  );
  return { deleteTaskMutation, createTaskMutation, updateTaskMutation };
};
