import type { ReactNode } from "react";

export function PageFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className={`mx-auto min-h-screen w-full max-w-md bg-white ${className}`}>
        {children}
      </div>
    </div>
  );
}
