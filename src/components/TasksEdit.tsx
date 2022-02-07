import { VFC, memo, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setEditedTask, selectTask } from "../slices/todoSlice";
import { useQueryTags } from "../hooks/useQueryTags";
import { useMutateTask } from "../hooks/useMutateTask";

export const TaskEdit: VFC = () => {
  // 編集モードの時のみ値が格納されている
  // 編集モードでない時はidが0番の初期値が入ってくる
  const editedTask = useAppSelector(selectTask);

  const dispatch = useAppDispatch();
  const { status, data } = useQueryTags();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();

  // クリックした時の挙動
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // idが0だった場合は新規作成

    if (editedTask.id === 0) createTaskMutation.mutate(editedTask);
    else {
      // idが0以外だった場合は更新
      updateTaskMutation.mutate(editedTask);
    }
  };

  console.log("rendered TaskEdit");
  if (status === "loading") return <div>{"Loading..."}</div>;
  if (status === "error") return <div>{"Error"}</div>;
  if (updateTaskMutation.isLoading) {
    return <span>Updating...</span>;
  }
  if (createTaskMutation.isLoading) {
    return <span>Creating...</span>;
  }

  // タグのオプション
  const tagOptions = data?.map((tag) => (
    <option key={tag.id} value={tag.id}>
      {tag.name}
    </option>
  ));

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new task ?"
          type="text"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          // editTaskがない場合は新規追加モード
          value={editedTask.title}
        />
        <button
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!editedTask.title || !editedTask.tag}
        >
          {editedTask.id === 0 ? "Create" : "Update"}
        </button>
      </form>
      <select
        className="mb-3 px-3 py-2 border border-gray-300"
        value={editedTask.tag}
        onChange={(e) =>
          dispatch(
            setEditedTask({ ...editedTask, tag: Number(e.target.value) })
          )
        }
      >
        <option value={0}>Tag</option>
        {tagOptions}
      </select>
    </div>
  );
};
export const TaskEditMemo = memo(TaskEdit);
