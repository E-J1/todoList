"use client";
import { useState, useRef, useEffect } from "react";

export default function OverflowTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const checkOverflow = () => {
    const el = textareaRef.current;
    if (!el) return;
    setIsOverflow(el.scrollHeight > el.clientHeight);
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    checkOverflow(); // 초기 체크
    el.addEventListener("input", checkOverflow);
    el.addEventListener("scroll", checkOverflow);
    return () => {
      el.removeEventListener("input", checkOverflow);
      el.removeEventListener("scroll", checkOverflow);
    };
  }, []);

  return (
    <div className="relative  h-full">
      <textarea
        ref={textareaRef}
        className="content-center text-center scrollbar-yellow w-full max-h-[229px] h-full p-2 rounded resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100 outline-none focus:outline-none"
        placeholder="내용을 입력하세요..."
      />
    </div>
  );
}
