"use client";

import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import ToDoInput from "@/components/ui/ToDoInput";
import LayeredButton from "@/components/ui/LayeredButton";
import useSWR, { mutate } from "swr";
import { API_URL } from "@/constants/common";
import { fetcher } from "@/lib/fetcher";
import { Item } from "@/types/Items";
import DetailTodoItem from "@/components/detail/DetailTodoItem";
import Image from "next/image";
import OverflowTextarea from "@/components/ui/OverflowTextarea";

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: todoDetailData } = useSWR<Item>(
    `${API_URL}/${itemId}`,
    fetcher
  );

  console.log(todoDetailData);

  // 폼 입력 상태
  const [name, setName] = useState(todoDetailData?.name || "");
  const [memo, setMemo] = useState(todoDetailData?.memo || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    todoDetailData?.imageUrl || ""
  );

  // 이미지 파일 처리

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이름 패턴 & 크기 체크
    if (!/^[A-Za-z0-9._-]+$/.test(file.name)) {
      alert("파일 이름은 영문·숫자·._-만 가능합니다.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지는 5MB 이하만 가능합니다.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   if (file.size > 5 * 1024 * 1024) {
  //     alert("5MB 이하만 업로드 가능합니다.");
  //     return;
  //   }
  //   if (!/^[a-zA-Z0-9_\-]+\.(png|jpe?g)$/i.test(file.name)) {
  //     alert("영어 파일명(.png, .jpg)만 허용됩니다.");
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => setImageUrl(reader.result as string);
  //   reader.readAsDataURL(file);
  // };

  // 수정완료
  const handleEdit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("isCompleted", String(todoDetailData?.isCompleted));
    formData.append("memo", memo);
    if (imageFile) formData.append("image", imageFile);

    await fetch(`${API_URL}/${todoDetailData?.id}`, {
      method: "PATCH",
      body: formData,
    });
    mutate(API_URL);
    router.push("/");
  };

  // 삭제
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`${API_URL}/${itemId}`, { method: "DELETE" }).then(() => {
      router.push("/");
    });
  };

  const isActive =
    todoDetailData?.memo !== memo ||
    todoDetailData?.imageUrl !== imagePreview ||
    todoDetailData?.name !== name;

  if (!todoDetailData) {
    return (
      <Container className="py-8">
        <p className="text-slate-500">로딩 중…</p>
      </Container>
    );
  }

  return (
    <Container className="py-4 sm:py-6 bg-white min-h-[calc(100vh-64px)]">
      <div className="max-w-[996px] mx-auto">
        <DetailTodoItem todo={todoDetailData} />
        <div className="grid  grid-cols-1 lg:grid-cols-[384px_588px] gap-6 mt-4 sm:mt-6">
          {/* 좌측: 이미지 업로드 영역 */}
          <div className="relative border-2 border-dashed border-slate-300 bg-slate-50 rounded-[24px] lg:max-w-[384px] h-[311px] flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="미리보기"
                className="object-contain max-h-full h-full max-w-full"
              />
            ) : (
              <Image
                src="/images/img_selector_bg.svg"
                alt="image select background"
                width={64}
                height={64}
              />
            )}
            <button
              type="button"
              className="absolute w-16 h-16 bottom-4 right-4 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image
                src="/icons/plus_icon_gray.svg"
                alt="plus icon"
                width={24}
                height={24}
              />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* 우측: 메모 입력 */}
          <div
            className="py-6 px-4 rounded-[24px] h-[311px] flex flex-col text-center justify-center"
            style={{ backgroundImage: "url('/images/memo.svg')" }}
          >
            <h3 className="text-amber-800 font-bold leading-none">Memo</h3>
            {/* <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="flex-1 resize-none bg-transparent outline-none overflow-y-auto pr-2 text-center"
            /> */}
            <OverflowTextarea />
          </div>
        </div>

        {/* 하단 버튼 */}

        <div className="flex justify-end mt-6 space-x-4">
          <LayeredButton variant="primary" size="lg">
            <Image
              src="/icons/check.svg"
              alt="todo plus button"
              width={16}
              height={16}
              className={`object-contain filter ${
                isActive ? "invert-0" : "invert"
              }`}
            />
            수정 완료
          </LayeredButton>
          <LayeredButton variant="delete" size="lg" onClick={handleDelete}>
            <Image
              src="/icons/x_icon.svg"
              alt="todo delete  button"
              width={16}
              height={16}
              className={`object-contain filter`}
            />
            삭제하기
          </LayeredButton>
        </div>
      </div>
    </Container>
  );
}
