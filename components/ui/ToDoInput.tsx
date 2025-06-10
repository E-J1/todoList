import { InputHTMLAttributes } from "react";

export default function ToDoInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="relative w-full">
      <div
        className={`absolute top-[3.5px] left-[1.12px] bg-slate-900 w-full h-full rounded-[24px] `}
        style={{ zIndex: 0 }}
      />
      <input
        {...props}
        className="absolute top-0 left-0 w-full h-[52.5px] border-2 bg-slate-100 rounded-[24px] px-6 
                  border-slate-900  focus:outline-none 
                 "
        style={{ zIndex: 10 }}
      />
    </div>
  );
}
