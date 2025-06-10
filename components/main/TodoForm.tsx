import { useState } from "react";
import { mutate } from "swr";
import ToDoInput from "../ui/ToDoInput";
import TodoAddButton from "../ui/buttons/TodoAddButton";
import { API_URL } from "@/constants/common";

export default function TodoForm() {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo();
  };

  const addTodo = async () => {
    if (!text.trim()) return alert("할 일을 입력해주세요.");
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: text }),
    }).then(() => {
      setText("");
      mutate(API_URL);
    });
  };

  return (
    // TODO: class sm: 사용(tailwind.config.js 에 정의한 mobile, tablet, desktop 미작동으로 추후 수정 예정, 임시 sm 사용)
    <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-4 mb-6 sm:mb-10">
      <ToDoInput
        type="text"
        placeholder="할 일을 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border-2 border-slate-900 rounded-full px-4 py-2 focus:outline-none"
      />
      <TodoAddButton isActive={!!text} onClick={handleSubmit} />
    </form>
  );
}
