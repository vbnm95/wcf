type ProgressHeaderProps = {
  progress: number;
};

export function ProgressHeader({ progress }: ProgressHeaderProps) {
  const safeProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <header className="sticky top-0 z-10 border-b border-[#EDF2F7] bg-[#FFFDF9]/90 px-6 py-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img src="/images/웰케어 로고.png" alt="웰케어 로고" className="h-8 w-auto shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#6AABF7]">Wellcare Finder</p>
            <h1 className="truncate text-xl font-extrabold tracking-normal text-[#173A63]">우리 아이 웰케어 찾기</h1>
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#5A9EEF] shadow-sm ring-1 ring-[#E7F0FA]">
          {safeProgress}%
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E9EEF4]">
        <div className="h-full rounded-full bg-[#6AABF7] transition-all duration-500" style={{ width: `${safeProgress}%` }} />
      </div>
    </header>
  );
}
