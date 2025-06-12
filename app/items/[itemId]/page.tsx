"use client";

import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import LayeredButton from "@/components/ui/LayeredButton";
import useSWR, { mutate } from "swr";
import { API_URL, IMAGE_API_URL } from "@/constants/common";
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
    fetcher,
  );

  // 폼 입력 상태
  const [name, setName] = useState(todoDetailData?.name || "");
  const [memo, setMemo] = useState(todoDetailData?.memo || "");
  const [imageUrl, setImageUrl] = useState<string | null>(
    todoDetailData?.imageUrl || null,
  );
  const [imagePreview, setImagePreview] = useState<string>(
    todoDetailData?.imageUrl || "",
  );

  useEffect(() => {
    setName(todoDetailData?.name || "");
    setMemo(todoDetailData?.memo || "");
    setImagePreview(todoDetailData?.imageUrl || "");
    setImageUrl(todoDetailData?.imageUrl || "");
  }, [todoDetailData]);
  // 이미지 파일 처리

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    // 이름 패턴 & 크기 체크
    if (!/^[A-Za-z]+$/.test(baseName)) {
      alert("파일 이름은 영문으로만 이루어져있어야 합니다.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지는 5MB 이하만 가능합니다.");
      e.target.value = "";
      return;
    }

    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    // 2) 업로드 API 호출
    const res = await fetch(`${IMAGE_API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("이미지 업로드 실패");
    const data = (await res.json()) as { url: string };

    // 3) 반환된 URL로 state 갱신
    setImageUrl(data?.url);
  };

  const handleMemoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  // 수정완료
  const handleEdit = async () => {
    await fetch(`${API_URL}/${todoDetailData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        memo,
        imageUrl: imageUrl || "",
        isCompleted: todoDetailData?.isCompleted,
      }),
    });
    mutate(`${API_URL}/${todoDetailData?.id}`);
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
    <Container className="min-h-[calc(100vh-64px)] bg-white py-4 sm:py-6">
      <div className="mx-auto max-w-[996px]">
        <DetailTodoItem todo={todoDetailData} name={name} setName={setName} />
        <div className="mt-4 grid grid-cols-1 gap-6 sm:mt-6 lg:grid-cols-[384px_588px]">
          {/* 좌측: 이미지 업로드 영역 */}
          <div className="relative flex h-[311px] items-center justify-center overflow-hidden rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 lg:max-w-[384px]">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="미리보기"
                className="h-full max-h-full max-w-full object-contain"
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
              className="absolute right-4 bottom-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-200"
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
            className="flex h-[311px] flex-col justify-center rounded-[24px] px-4 py-6 text-center"
            style={{ backgroundImage: "url('/images/memo.svg')" }}
          >
            <h3 className="mb-4 leading-none font-bold text-amber-800">Memo</h3>

            <OverflowTextarea onChange={handleMemoChange} text={memo} />
          </div>
        </div>

        {/* 하단 버튼 */}

        <div className="mt-6 flex justify-end space-x-4">
          <LayeredButton
            variant={isActive ? "edit_done_active" : "primary"}
            size="lg"
            onClick={handleEdit}
          >
            <Image
              src="/icons/check.svg"
              alt="todo plus button"
              width={16}
              height={16}
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
