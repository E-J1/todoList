"use client";

import Container from "@/components/ui/Container";
import TodoForm from "@/components/main/TodoForm";
import TodoList from "@/components/TodoList";

export default function HomePage() {
  return (
    <Container className="py-4 sm:py-6 min-h-[calc(100vh-64px)]">
      {/* 입력 폼 */}
      <TodoForm />
      {/* 투두/완료 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {/* TO DO 컬럼 */}
        <TodoList isCompleted={false} />

        {/* DONE 컬럼 */}
        <TodoList isCompleted={true} />
      </div>
    </Container>
  );
}
