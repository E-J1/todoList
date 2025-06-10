"use client";
import React from "react";
import LayeredButton from "../LayeredButton";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
/**
 * Todo 추가 버튼
 * 744px 이상: "lg" 사이즈, "추가하기" 텍스트 표시
 * 744px 이하: "sm" 사이즈, "추가하기" 텍스트 감추기
 * 버튼 활성: 보라색, 비활성: 회색
 */

interface Props {
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}
export default function TodoAddButton({ isActive = false, onClick }: Props) {
  const isMdUp = useMediaQuery("(min-width: 744px)");
  const size = isMdUp ? "lg" : "sm";

  return (
    <div>
      <LayeredButton
        variant={isActive ? "add_active" : "primary"}
        size={size}
        onClick={onClick}
      >
        <Image
          src="/icons/plus_icon_white.svg"
          alt="todo plus button"
          width={16}
          height={16}
          className={`object-contain filter ${
            isActive ? "invert-0" : "invert"
          }`}
        />
        <span className="hidden sm:inline">추가하기</span>
      </LayeredButton>
    </div>
  );
}
