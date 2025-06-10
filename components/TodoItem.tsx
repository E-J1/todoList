"use client";

import Image from "next/image";
import { Item } from "../types/Items";

interface Props {
  todo: Item;
  onToggle: (todo: Item) => void;
}

export default function TodoItem({ todo, onToggle }: Props) {
  const isCompleted = todo.isCompleted;
  const name = todo.name;

  // 아이콘 파일 경로
  const iconSrc = isCompleted
    ? "/icons/checkbox_checked.svg"
    : "/icons/checkbox_default.svg";
  const iconAlt = isCompleted ? "완료됨" : "미완료";

  const completedClass = isCompleted
    ? "bg-violet-100 line-through"
    : "bg-white ";

  return (
    <li
      className={`flex items-center h-[50px] border-slate-900 rounded-[27px] border-2 px-3 text-slate-800 ${completedClass}`}
    >
      <button
        type="button"
        onClick={() => onToggle(todo)}
        className={`w-[32px] h-[32px] rounded-full mr-4 cursor-pointer`}
      >
        <Image src={iconSrc} alt={iconAlt} width={32} height={32} />
      </button>
      <a href={`/items/${todo.id}`}>{todo.name}</a>
    </li>
  );
}
