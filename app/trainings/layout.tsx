// app/trainings/layout.tsx
import NavigationHeader from "@/components/NavigationHeader";
import ScrollReset from "@/components/ScrollReset";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "研修ページ",
  description: "司書別／研修別の切り替えができます",
};

export default function TrainingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ScrollReset /> {/* ← これがスクロール位置を戻す */}
      <NavigationHeader />
      <main className="p-4">{children}</main>
    </div>
  );
}
