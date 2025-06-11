import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";

// スプレッドシートごとの設定
const SHEETS_CONFIG: {
  id: string;
  name: string;
  key: string; // 識別用キー
}[] = [
  { id: process.env.LIBRARIANS_SHEET_ID!, name: "司書一覧", key: "staffRaw" },
  {
    id: process.env.LIBRARIAN_TRAINING_LOG_SHEET_ID!,
    name: "司書研修記録一覧",
    key: "trainingRecordsRaw",
  },
  {
    id: process.env.TRAINING_LOG_BY_SESSION_SHEET_ID!,
    name: "研修別記録一覧",
    key: "trainingByTitleRaw",
  },
  {
    id: process.env.TRAINING_LIST_SHEET_ID!,
    name: "研修一覧",
    key: "trainingProgramsRaw",
  },
];

let cache: {
  timestamp: number;
  data: Record<string, Record<string, string | undefined>[]>;
} | null = null;

export async function fetchMultipleSheetsSecure(): Promise<
  Record<string, Record<string, string | undefined>[]>
> {
  const now = Date.now();

  if (cache && now - cache.timestamp < 60_000) {
    console.log("✅ using cached multi-sheet data");
    return cache.data;
  }

  console.log("📡 fetching all sheets from multiple files");

  const keyFilePath = path.resolve(
    process.cwd(),
    "credentials/shizuoka-central-library-next-13cea9525404.json"
  );
  const credentials = JSON.parse(readFileSync(keyFilePath, "utf8"));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const result: Record<string, Record<string, string | undefined>[]> = {};

  for (const { id, name, key } of SHEETS_CONFIG) {
    const range = `'${name}'!A1:Z1000`;
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: id,
        range,
      });

      const data = res.data;

      if (!data.values) {
        console.warn(`⚠️ No values for ${key}`);
        result[key] = [];
        continue;
      }

      const [header, ...rows] = data.values;
      result[key] = rows.map((row) =>
        Object.fromEntries(header.map((key, i) => [key, row[i]]))
      );
    } catch (error) {
      console.error(`❌ Failed to fetch for ${key}`, error);
      result[key] = [];
    }
  }

  // キャッシュ保存
  cache = {
    timestamp: now,
    data: result,
  };
  //console.log(result);

  return result;
}
