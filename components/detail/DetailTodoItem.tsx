"use client";

import Image from "next/image";
import { Item } from "../../types/Items";
import { API_URL } from "@/constants/common";
import { mutate } from "swr";

interface Props {
  todo: Item;
}

export default function DetailTodoItem({ todo }: Props) {
  const isCompleted = todo?.isCompleted;

  // 아이콘 파일 경로
  const iconSrc = isCompleted
    ? "/icons/checkbox_checked.svg"
    : "/icons/checkbox_default.svg";
  const iconAlt = isCompleted ? "완료됨" : "미완료";

  const completedClass = isCompleted ? "bg-violet-100 " : "bg-white ";

  const toggleTodo = async (todo: Item) => {
    const { id, tenantId, ...rest } = todo;
    const submitBody = Object.fromEntries(
      Object.entries(rest).filter(([_, value]) => value != null) // null 또는 undefined를 제거
    );
    submitBody.isCompleted = !submitBody.isCompleted;

    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitBody),
    });

    mutate(`${API_URL}/${id}`);
  };

  return (
    <li
      className={`flex items-center justify-center h-[64px] border-slate-900 rounded-[24px] border-2 px-3 text-slate-800 ${completedClass}`}
    >
      <button
        type="button"
        onClick={() => toggleTodo(todo)}
        className={`w-[32px] h-[32px] rounded-full mr-4 cursor-pointer`}
      >
        <Image src={iconSrc} alt={iconAlt} width={32} height={32} />
      </button>
      <span className="underline detail-todo text-xl font-bold">
        {todo.name}
      </span>
    </li>
  );
}
