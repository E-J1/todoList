// app/items/[itemId]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import ToDoInput from "@/components/ui/ToDoInput";
import LayeredButton from "@/components/ui/LayeredButton";

interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export default function ItemDetailPage() {
  const { itemId } = useParams();
  const router = useRouter();

  // API에서 받아온 원본 데이터
  const [item, setItem] = useState<Item | null>(null);

  // 폼 입력 상태
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 페이지 로드 시 아이템을 가져옵니다.
  useEffect(() => {
    if (!itemId) return;
    // TODO: SWR이나 fetch 로직을 여기에 붙여 주세요.
    // 예) const { data } = useSWR(`/api/items/${itemId}`)
    // setItem(data)
  }, [itemId]);

  // item이 로드되면 폼 초기화
  useEffect(() => {
    if (!item) return;
    setName(item.name);
    setMemo(item.memo ?? "");
    setIsCompleted(item.isCompleted);
    setImageUrl(item.imageUrl);
  }, [item]);

  // 이미지 파일 처리
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하만 업로드 가능합니다.");
      return;
    }
    if (!/^[a-zA-Z0-9_\-]+\.(png|jpe?g)$/i.test(file.name)) {
      alert("영어 파일명(.png, .jpg)만 허용됩니다.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 저장
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    await fetch(`/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, memo, imageUrl, isCompleted }),
    });
    router.push("/");
  };

  // 삭제
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`/api/items/${itemId}`, { method: "DELETE" });
    router.push("/");
  };

  //   if (!item) {
  //     return (
  //       <Container className="py-8">
  //         <p className="text-slate-500">로딩 중…</p>
  //       </Container>
  //     );
  //   }

  return (
    <Container className="py-8">
      <h1 className="text-xl font-bold mb-6">상세 페이지</h1>

      <div className="flex flex-col tablet:flex-row gap-6">
        {/* 이미지 업로드 */}
        <div className="flex-1">
          <label className="relative block h-48 border-2 border-dashed border-slate-400 rounded-lg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="업로드된 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                + 이미지 업로드
              </div>
            )}
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFile}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* 수정 폼 */}
        <form
          onSubmit={handleSave}
          className="flex-1 flex flex-col space-y-4 gap-4"
        >
          <ToDoInput
            name="todo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="할 일 제목을 입력하세요"
          />

          <textarea
            className="w-full h-32 border rounded-lg p-2 resize-none"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
          />

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted((c) => !c)}
              className="form-checkbox"
            />
            <span>완료 표시</span>
          </label>

          <div className="mt-auto flex space-x-4">
            <LayeredButton variant="primary" size="lg">
              ✔️ 수정 완료
            </LayeredButton>
            <LayeredButton variant="delete" size="lg" onClick={handleDelete}>
              ✖️ 삭제하기
            </LayeredButton>
          </div>
        </form>
      </div>
    </Container>
  );
}
