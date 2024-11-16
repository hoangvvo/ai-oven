export function Logo({ hideText }: { hideText?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-lg font-bold">👨‍🍳✨</span>
      {!hideText && (
        <span className="text-lg font-black text-gray-900">AI Oven</span>
      )}
    </div>
  );
}
