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
      className={`flex h-[50px] items-center rounded-[27px] border-2 border-slate-900 px-3 text-slate-800 ${completedClass}`}
    >
      <button
        type="button"
        onClick={() => toggleTodo(todo)}
        className={`mr-4 h-[32px] w-[32px] flex-shrink-0 cursor-pointer rounded-full`}
      >
        <Image src={iconSrc} alt={iconAlt} width={32} height={32} />
      </button>
      <a href={`/items/${todo.id}`}>{todo.name}</a>
    </li>
  );
}
