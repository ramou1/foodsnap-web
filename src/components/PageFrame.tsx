import type { ReactNode } from "react";

export function PageFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 md:px-6 md:py-8">
      <div
        className={`mx-auto min-h-screen w-full bg-white md:min-h-[calc(100vh-4rem)] md:max-w-5xl md:rounded-2xl md:shadow-sm ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
