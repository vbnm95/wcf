"use client";

import { ChevronRight } from "lucide-react";
import type { QuestionOption } from "@/types";

type OptionButtonProps = {
  option: QuestionOption;
  disabled?: boolean;
  onSelect: (option: QuestionOption) => void;
};

export function OptionButton({ option, disabled = false, onSelect }: OptionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={option.label}
      onClick={() => onSelect(option)}
      className="group flex w-full items-center justify-between gap-3 rounded-[20px] bg-white px-4 py-3 text-left shadow-[0_8px_22px_rgba(32,41,54,0.06)] ring-1 ring-[#EDF2F7] transition hover:-translate-y-0.5 hover:bg-[#F3F8FF] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-55"
    >
      <span className="flex min-w-0 items-center gap-3">
        {option.iconImage ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DDEEFF] ring-1 ring-[#D9EBFF]">
            <img src={option.iconImage} alt="" aria-hidden className="h-full w-full object-contain p-1.5" />
          </span>
        ) : null}
        <span className="min-w-0">
          <span className="block text-sm font-bold text-[#202936]">{option.label}</span>
          {option.helperText ? <span className="mt-1 block text-xs text-[#657489]">{option.helperText}</span> : null}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#6AABF7] transition group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}
