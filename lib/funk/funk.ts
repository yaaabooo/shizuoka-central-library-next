export function normalizeTitle(title: string): string {
  return title
    .replace(/[Ａ-Ｚａ-ｚ０-９（）]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    )
    .replace(/[‐–－]/g, "-")
    .trim();
}

export function getMarkForTraining([minYear, maxYear]: [
  number,
  number
]): string {
  if (maxYear <= 10) return "🟢";
  if (maxYear <= 20) return "🌸";
  if (maxYear <= 25) return "🌸🌸";
  return "🌸🌸🌸";
}
