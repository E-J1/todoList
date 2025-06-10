import { ReactNode } from "react";

type Variant = "add_active" | "delete" | "primary" | "edit_done_active";
type Size = "sm" | "lg";

interface Props {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const VARIANT_BG: Record<Variant, string> = {
  add_active: "bg-violet-600 text-white",
  delete: "bg-rose-500 text-white",
  primary: "bg-slate-200",
  edit_done_active: "bg-lime-300",
};

const SIZE_CLASSES: Record<
  Size,
  { wrapper: string; layer: string; button: string }
> = {
  sm: {
    wrapper: "",
    layer: "top-[4px] left-[1.22px]",
    button: "w-[54.78px] h-[52px] rounded-[24px]",
  },
  lg: {
    wrapper: "",
    layer: "top-[4px] left-[3.65px]",
    button: "text-base w-[164.35px] h-[52px] rounded-[24px]",
  },
};

export default function LayeredButton({
  children,
  variant = "primary",
  size = "lg",
  onClick,
  className = "",
}: Props) {
  const bgClass = VARIANT_BG[variant];
  const { wrapper, layer, button } = SIZE_CLASSES[size];

  return (
    <>
      <div className={`relative w-fit ${wrapper} ${className}  `}>
        {/* 뒤 검정 쉐딩 레이어: slate-900 */}
        <div
          className={`absolute bg-slate-900 w-full h-full rounded-[24px] ${layer}`}
        />
        {/* 앞 버튼 */}

        <button
          type="button"
          onClick={onClick}
          className={`flex gap-1 relative top-0 left-0 font-bold 
                    items-center justify-center shadow-none border-2 border-slate-900 cursor-pointer
                    ${button} ${bgClass}`}
        >
          {children}
        </button>
      </div>
    </>
  );
}
