"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Heart } from "lucide-react";
import type { ChatMessage, QuestionOption } from "@/types";
import { getInitialGuideMessage, getResultProducts, getTreeNode } from "@/lib/tree";
import { ChatBubble } from "./ChatBubble";
import { OptionButton } from "./OptionButton";
import { ProgressHeader } from "./ProgressHeader";
import { ResultCard } from "./ResultCard";

function createGuideMessage(text: string): ChatMessage {
  return { id: `guide-${Date.now()}-${Math.random()}`, sender: "guide", text };
}

function createUserMessage(text: string): ChatMessage {
  return { id: `user-${Date.now()}-${Math.random()}`, sender: "user", text };
}

export function ChatApp() {
  const [started, setStarted] = useState(false);
  const [nodeId, setNodeId] = useState("start");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChoosing, setIsChoosing] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const currentNode = useMemo(() => getTreeNode(nodeId), [nodeId]);
  const progress = started ? currentNode.progress : 0;

  useEffect(() => {
    if (currentNode.type === "result") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, currentNode.type]);

  const startChat = () => {
    setStarted(true);
    setNodeId("start");
    setMessages([createGuideMessage(getInitialGuideMessage())]);
  };

  const restart = () => {
    setStarted(false);
    setNodeId("start");
    setMessages([]);
    setIsChoosing(false);
  };

  const handleSelect = (option: QuestionOption) => {
    if (isChoosing) return;

    setIsChoosing(true);
    const nextNode = getTreeNode(option.next);
    const safeNextId = nextNode.id;

    setMessages((previous) => {
      const nextMessages = [...previous, createUserMessage(option.label)];
      if (nextNode.type === "question") {
        nextMessages.push(createGuideMessage(nextNode.message));
      } else {
        nextMessages.push(createGuideMessage("답변을 바탕으로 케어 리포트를 만들었어요."));
      }
      return nextMessages;
    });
    setNodeId(safeNextId);

    window.setTimeout(() => setIsChoosing(false), 220);
  };

  if (!started) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#FBF8F3] px-4 py-8 text-slate-900">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-[430px] overflow-hidden rounded-[34px] bg-[#FFFDF9] shadow-[0_28px_90px_rgba(56,105,163,0.18)] ring-1 ring-[#E7F0FA]"
        >
          <div className="pointer-events-none absolute right-7 top-7 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#A9D1FF] text-[#6BA8F7]">
            <Heart className="h-5 w-5 fill-[#D9EBFF]" aria-hidden />
          </div>
          <div className="px-8 pb-8 pt-16">
            <div className="mx-auto max-w-[320px] text-center">
              <img src="/images/welcare-logo.png" alt="웰케어 로고" className="mx-auto mb-7 h-10 w-auto object-contain" />
              <h1 className="text-[28px] font-extrabold leading-9 tracking-normal text-[#173A63]">우리 아이 웰케어 찾기</h1>
              <div className="mt-9 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E9EEF4]">
                  <div className="h-full w-[10%] rounded-full bg-[#6AABF7]" />
                </div>
                <span className="text-sm font-bold text-[#5A9EEF]">10%</span>
              </div>
            </div>

            <div className="mt-9 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DDEEFF] p-1.5">
                  <img src="/images/guide-avatar.png" alt="웰케어 가이드" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold text-[#6AABF7]">웰케어 가이드</p>
                  <div className="rounded-[22px] rounded-tl-md bg-white px-5 py-4 text-base font-medium leading-8 text-[#202936] shadow-[0_12px_34px_rgba(32,41,54,0.1)] ring-1 ring-[#EDF2F7]">
                    안녕하세요!
                    <br />
                    우리 아이에게 맞는
                    <br />
                    웰케어 제품을 찾아드릴게요.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DDEEFF] p-1.5">
                  <img src="/images/guide-avatar.png" alt="웰케어 가이드" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold text-[#6AABF7]">웰케어 가이드</p>
                  <div className="flex items-center gap-4 rounded-[22px] rounded-tl-md bg-white px-5 py-4 text-base font-medium text-[#202936] shadow-[0_12px_34px_rgba(32,41,54,0.1)] ring-1 ring-[#EDF2F7]">
                    약 1분 정도 걸려요.
                    <Clock3 className="h-7 w-7 text-[#6AABF7]" aria-hidden />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex h-36 items-end justify-center overflow-hidden">
              <img src="/images/start-pets.png" alt="" aria-hidden className="h-full max-w-full object-contain" />
            </div>

            <button
              type="button"
              onClick={startChat}
              className="mt-2 flex w-full items-center justify-center gap-8 rounded-[22px] bg-[#6AABF7] px-5 py-5 text-lg font-extrabold text-white shadow-[0_14px_26px_rgba(91,157,239,0.32)] transition hover:-translate-y-0.5 hover:bg-[#579BEF]"
            >
              시작하기
              <ArrowRight className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </motion.section>
      </main>
    );
  }

  const resultProducts =
    currentNode.type === "result"
      ? getResultProducts(currentNode.primaryProductId, currentNode.secondaryProductIds)
      : { primaryProduct: undefined, secondaryProducts: [] };

  return (
    <main className="flex min-h-dvh justify-center bg-[#FBF8F3] text-slate-900 sm:px-4 sm:py-8">
      <section className="flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[#FFFDF9] shadow-none sm:min-h-[780px] sm:rounded-[34px] sm:shadow-[0_28px_90px_rgba(56,105,163,0.16)] sm:ring-1 sm:ring-[#E7F0FA]">
        <ProgressHeader progress={progress} />
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} sender={message.sender}>
                {message.text}
              </ChatBubble>
            ))}

            {currentNode.type === "result" && resultProducts.primaryProduct ? (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="pt-1"
              >
                <ResultCard
                  result={currentNode}
                  primaryProduct={resultProducts.primaryProduct}
                  secondaryProducts={resultProducts.secondaryProducts}
                  onRestart={restart}
                />
              </motion.div>
            ) : null}
            <div ref={bottomRef} />
          </div>
        </div>

        {currentNode.type === "question" ? (
          <div className="border-t border-[#EDF2F7] bg-[#FFFDF9]/95 px-4 py-4 backdrop-blur">
            <div className="grid gap-2">
              {currentNode.options.map((option) => (
                <OptionButton key={`${currentNode.id}-${option.value}`} option={option} disabled={isChoosing} onSelect={handleSelect} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
