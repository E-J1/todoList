"use client";

import Container from "@/components/ui/Container";
import TodoForm from "@/components/main/TodoForm";
import TodoList from "@/components/main/TodoList";

export default function HomePage() {
  return (
    <Container className="py-4 sm:py-6">
      {/* 입력 폼 */}
      <TodoForm />
      {/* 투두/완료 그리드 */}
      <div className="desktop:grid-cols-2 grid grid-cols-1 gap-12">
        {/* TO DO 컬럼 */}
        <TodoList isCompleted={false} />

        {/* DONE 컬럼 */}
        <TodoList isCompleted={true} />
      </div>
    </Container>
  );
}
