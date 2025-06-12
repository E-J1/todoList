"use client";

import Image from "next/image";
import { Item } from "../../types/Items";
import { API_URL } from "@/constants/common";
import { mutate } from "swr";
import { Dispatch, SetStateAction, useLayoutEffect, useRef } from "react";

interface Props {
  todo: Item;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export default function DetailTodoItem({ todo, name, setName }: Props) {
  const isCompleted = todo?.isCompleted;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 아이콘 파일 경로
  const iconSrc = isCompleted
    ? "/icons/checkbox_checked.svg"
    : "/icons/checkbox_default.svg";
  const iconAlt = isCompleted ? "완료됨" : "미완료";

  const completedClass = isCompleted ? "bg-violet-100 " : "bg-white ";

  const toggleTodo = async (todo: Item) => {
    const { id, tenantId, ...rest } = todo;
    const submitBody = Object.fromEntries(
      Object.entries(rest).filter(([_, value]) => value != null), // null 또는 undefined를 제거
    );
    submitBody.isCompleted = !submitBody.isCompleted;

    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitBody),
    });

    mutate(`${API_URL}/${id}`);
  };

  useLayoutEffect(() => {
    if (!spanRef.current || !inputRef.current) return;
    // 숨겨진 span의 실제 폭
    const width = spanRef.current.getBoundingClientRect().width;
    // 약간 여유(padding) 더해주기
    inputRef.current.style.width = `${width + 6}px`;
  }, [name]);

  return (
    <li
      className={`flex h-[64px] items-center justify-center rounded-[24px] border-2 border-slate-900 px-3 text-slate-800 ${completedClass}`}
    >
      <button
        type="button"
        onClick={() => toggleTodo(todo)}
        className={`mr-4 h-[32px] w-[32px] cursor-pointer rounded-full`}
      >
        <Image src={iconSrc} alt={iconAlt} width={32} height={32} />
      </button>

      {/* 화면에는 보이지 않지만, 같은 폰트·스타일로 텍스트 측정 */}
      <span
        ref={spanRef}
        className={`invisible absolute text-xl font-bold whitespace-pre`}
      >
        {name || " " /* 빈 문자열일 땐 공백 하나로 최소폭 유지 */}
      </span>
      <input
        ref={inputRef}
        style={{ width: `${Math.max(name?.length, 1.3)}ch` }}
        className="detail-todo text-xl font-bold underline"
        value={name}
        onChange={handleNameChange}
      />
    </li>
  );
}
