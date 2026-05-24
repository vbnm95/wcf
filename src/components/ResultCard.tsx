"use client";

import { AlertTriangle, CheckCircle2, ExternalLink, RotateCcw, Sparkles } from "lucide-react";
import type { Product, ResultNode } from "@/types";
import { ProductCard } from "./ProductCard";

type ResultCardProps = {
  result: ResultNode;
  primaryProduct: Product;
  secondaryProducts: Product[];
  onRestart: () => void;
};

export function ResultCard({ result, primaryProduct, secondaryProducts, onRestart }: ResultCardProps) {
  return (
    <section className="rounded-[28px] bg-white p-5 shadow-[0_18px_48px_rgba(56,105,163,0.14)] ring-1 ring-[#E7F0FA]">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6FF] px-3 py-1.5 text-xs font-bold text-[#3E88DC]">
        <Sparkles className="h-3.5 w-3.5" aria-hidden />
        {result.careType}
      </div>
      <h2 className="mt-4 text-xl font-extrabold leading-8 text-[#173A63]">{primaryProduct.shortName}를 먼저 추천해요</h2>
      <p className="mt-2 text-sm leading-6 text-[#657489]">{result.message}</p>

      <div className="mt-5">
        <ProductCard product={primaryProduct} />
      </div>

      <div className="mt-5 rounded-3xl bg-[#F3F8FF] p-4">
        <p className="text-sm font-bold text-[#173A63]">추천 이유</p>
        <ul className="mt-3 space-y-2">
          {primaryProduct.recommendReasons.map((reason) => (
            <li key={reason} className="flex gap-2 text-sm leading-6 text-[#3E4A5B]">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#6AABF7]" aria-hidden />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {primaryProduct.feedingTip ? (
        <div className="mt-4 rounded-3xl bg-[#F0FAF5] p-4 text-sm leading-6 text-[#245C45]">
          <p className="font-bold">급여/사용 팁</p>
          <p className="mt-1">{primaryProduct.feedingTip}</p>
        </div>
      ) : null}

      <div className="mt-4 rounded-3xl bg-[#FFF7E8] p-4 text-sm leading-6 text-[#6A4A14]">
        <p className="flex items-center gap-2 font-bold">
          <AlertTriangle className="h-4 w-4" aria-hidden />
          주의사항
        </p>
        <p className="mt-1">{result.caution ?? primaryProduct.caution}</p>
      </div>

      {secondaryProducts.length > 0 ? (
        <div className="mt-6">
          <p className="text-sm font-bold text-[#173A63]">함께 비교해볼 제품</p>
          <div className="mt-3 space-y-3">
            {secondaryProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {primaryProduct.detailUrl ? (
          <a
            href={primaryProduct.detailUrl}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#6AABF7] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(91,157,239,0.24)] transition hover:bg-[#579BEF]"
          >
            제품 보러가기
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          <div className="rounded-2xl bg-[#F3F8FF] px-4 py-3 text-center text-sm font-semibold text-[#657489]">제품 링크 준비중</div>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#173A63] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#102B4A]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          처음부터 다시하기
        </button>
      </div>
    </section>
  );
}
