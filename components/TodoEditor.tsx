import { useState, ChangeEvent, FormEvent } from "react";
import { Item } from "../types/Items";

interface Props {
  todo: Item;
  onSave: (todo: Item) => void;
  onDelete: (id: number) => void;
}

export default function TodoEditor({ todo, onSave, onDelete }: Props) {
  // 로컬 상태로 에디터 관리
  const [text, setText] = useState(todo.memo);
  const [isCompleted, setCompleted] = useState(todo.isCompleted);
  const [memo, setMemo] = useState(todo.memo || "");
  const [imageUrl, setImageUrl] = useState<string | null>(todo.imageUrl);

  // 이미지 파일 선택 핸들러
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("5MB 이하만 업로드 가능합니다.");
      return;
    }
    if (!/^[a-zA-Z0-9_\-]+\.(jpg|jpeg|png)$/i.test(file.name)) {
      alert("영어 파일명(.jpg/.png)만 허용됩니다.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 저장 버튼 클릭
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      id: todo.id,
      tenantId: todo.tenantId,
      name: todo.name,
      memo,
      isCompleted,
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 할 일 텍스트 편집 */}
      <label>
        제목
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>

      {/* 진행/완료 토글 */}
      <label>
        완료
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setCompleted(!isCompleted)}
        />
      </label>

      {/* 메모 입력 */}
      <label>
        메모
        <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
      </label>

      {/* 이미지 업로드 */}
      <label>
        이미지 첨부 (최대 1개)
        <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFile} />
      </label>
      {imageUrl && <img src={imageUrl} alt="Todo 이미지" width={200} />}

      {/* 액션 버튼 */}
      <button type="submit">수정 완료</button>
      <button type="button" onClick={() => onDelete(todo.id)}>
        삭제하기
      </button>
    </form>
  );
}
