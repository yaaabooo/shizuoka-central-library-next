export async function fetchSheet(
  spreadsheetId: string,
  sheetName: string
): Promise<Record<string, string | undefined>[]> {
  const apiKey = process.env.GOOGLE_API_KEY!;
  const range = encodeURIComponent(`${sheetName}!A1:Z1000`);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  console.log("🔍 Fetching from:", url); // ✅ URL確認用ログ

  const res = await fetch(url);
  const data = await res.json();

  console.log("📄 API response:", data); // ✅ APIのレスポンス確認用ログ

  if (!data.values) {
    console.error("❗️Missing 'values' in response:", data);
    return [];
  }

  const [header, ...rows] = data.values;
  return rows.map((row: string[]) =>
    Object.fromEntries(header.map((key: string, i: number) => [key, row[i]]))
  );
}
