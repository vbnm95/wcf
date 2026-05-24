"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ChatBubbleProps = {
  sender: "guide" | "user";
  children: ReactNode;
};

export function ChatBubble({ sender, children }: ChatBubbleProps) {
  const isGuide = sender === "guide";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={`flex w-full gap-2 ${isGuide ? "justify-start" : "justify-end"}`}
    >
      {isGuide ? (
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DDEEFF] p-1.5 shadow-sm ring-1 ring-[#D9EBFF]">
          <img src="/images/guide-avatar.png" alt="웰케어 가이드" className="h-full w-full object-contain" />
        </div>
      ) : null}
      <div
        className={`max-w-[82%] rounded-[22px] px-4 py-3 text-sm font-medium leading-6 shadow-sm ${
          isGuide
            ? "rounded-tl-md bg-white text-[#202936] shadow-[0_10px_26px_rgba(32,41,54,0.08)] ring-1 ring-[#EDF2F7]"
            : "rounded-tr-md bg-[#6AABF7] text-white shadow-[0_10px_22px_rgba(91,157,239,0.24)]"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}
