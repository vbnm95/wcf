"use client";

import { useState } from "react";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

function ProductThumbnail({ product, compact }: { product: Product; compact: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const sizeClass = compact ? "h-16 w-16" : "h-20 w-20";
  const fallbackText = product.shortName.replace(/^웰케어\s*/, "").slice(0, 1) || "W";

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-[#EEF6FF] shadow-sm ring-1 ring-[#D9EBFF]`}
    >
      {product.image && !imageFailed ? (
        <img
          src={product.image}
          alt={`${product.name} 제품 이미지`}
          className="h-full w-full object-contain p-2"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="text-xl font-extrabold text-[#5A9EEF]">{fallbackText}</span>
      )}
    </div>
  );
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <article className={`rounded-3xl bg-white shadow-sm ring-1 ring-[#EDF2F7] ${compact ? "p-4" : "p-5"}`}>
      <div className="flex gap-3">
        <ProductThumbnail product={product} compact={compact} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-1.5">
            {product.badges.slice(0, compact ? 2 : 3).map((badge) => (
              <span key={badge} className="rounded-full bg-[#EEF6FF] px-2.5 py-1 text-[11px] font-semibold text-[#3E88DC]">
                {badge}
              </span>
            ))}
          </div>
          <h3 className="mt-2 text-base font-extrabold text-[#173A63]">{product.name}</h3>
          <p className="mt-1 text-xs font-semibold text-[#657489]">
            {product.category} · {product.form}
          </p>
        </div>
      </div>
      <p className={`${compact ? "mt-3 line-clamp-2 text-xs" : "mt-4 text-sm"} leading-6 text-[#657489]`}>{product.description}</p>
    </article>
  );
}
