"use client";

import Image from "next/image";
import { Item } from "../../types/Items";
import { API_URL } from "@/constants/common";
import { mutate } from "swr";

interface Props {
  todo: Item;
}

export default function TodoItem({ todo }: Props) {
  const isCompleted = todo?.isCompleted;

  // 아이콘 파일 경로
  const iconSrc = isCompleted
    ? "/icons/checkbox_checked.svg"
    : "/icons/checkbox_default.svg";
  const iconAlt = isCompleted ? "완료됨" : "미완료";

  const completedClass = isCompleted
    ? "bg-violet-100 line-through"
    : "bg-white ";

  const toggleTodo = async (todo: Item) => {
    const { id, ...rest } = todo;
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...rest, isCompleted: !todo.isCompleted }),
    });
    mutate(API_URL);
  };

  return (
    <li
      className={`flex items-center h-[50px] border-slate-900 rounded-[27px] border-2 px-3 text-slate-800 ${completedClass}`}
    >
      <button
        type="button"
        onClick={() => toggleTodo(todo)}
        className={`w-[32px] h-[32px] rounded-full mr-4 cursor-pointer`}
      >
        <Image src={iconSrc} alt={iconAlt} width={32} height={32} />
      </button>
      <a href={`/items/${todo.id}`}>{todo.name}</a>
    </li>
  );
}
