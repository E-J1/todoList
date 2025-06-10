import useSWR from "swr";
import { Item } from "@/types/Items";
import { API_URL } from "@/constants/common";
import TodoItem from "./TodoItem";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";

interface Props {
  isCompleted: boolean;
}

export default function TodoList({ isCompleted }: Props) {
  const {
    data = [],
    mutate,
    error,
    isLoading,
  } = useSWR<Item[]>(API_URL, fetcher);

  const todoList = data.filter((t) => !t.isCompleted);
  const doneList = data.filter((t) => t.isCompleted);

  const todoHeading = isCompleted ? "/images/done.svg" : "/images/todo.svg";
  const targetList = isCompleted ? doneList : todoList;
  const emptyImage = isCompleted
    ? "/images/done_list_empty.svg"
    : "/images/todo_list_empty.svg";
  const emptyMessage = isCompleted
    ? `아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`
    : `할 일이 없어요.\nTODO를 새롭게 추가해주세요!`;

  const lines = emptyMessage.split("\n");

  const toggleTodo = async (todo: Item) => {
    const { id, ...rest } = todo;
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...rest, isCompleted: !todo.isCompleted }),
    });
    mutate();
  };

  return (
    <section>
      {/* 에러/로딩 처리 */}
      {error && (
        <p className="text-red-500 mb-4">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      )}
      {isLoading && (
        <p className="text-violet-600 mb-4">할 일을 불러오는 중입니다!</p>
      )}

      <Image
        src={todoHeading}
        alt={isCompleted ? "todo" : "done"}
        width={101}
        height={36}
        className="mb-4"
      />

      {!isLoading && !targetList.length && (
        <div className="text-slate-400 font-bold text-center">
          <Image
            src={emptyImage}
            alt="empty Image"
            width={240}
            height={240}
            className="mx-auto mt-[64px] h-[240px]"
          />
          <p className="mt-4 sm:mt-6">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {targetList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
        ))}
      </ul>
    </section>
  );
}
