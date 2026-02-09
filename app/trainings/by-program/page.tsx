export const dynamic = "force-dynamic";

import TrainingMatrixByProgram from "./TrainingMatrixByProgram";
import { fetchMultipleSheetsSecure } from "@/lib/sheets/fetchSheetSecure";

import { TrainingRecordByTitle } from "@/lib/types/staff";
import { TrainingByTitleRaw } from "@/lib/types/staff";

export default async function Page() {
  const {
    staffRaw,
    trainingRecordsRaw,
    trainingByTitleRaw,
    trainingProgramsRaw,
  } = await fetchMultipleSheetsSecure();

  const staffData = staffRaw
    // 不在に何か書いてある人は除外
    .filter((row) => !row["不在"])
    .map((row) => ({
      name: row["名前"] ?? "",
      role: row["役職"] ?? "",

      experienceInThisLibrary:
        row["当館経験年数"] !== "" ? Number(row["当館経験年数"]) : 0,

      otherExperience:
        row["その他図書館"] !== "" && row["その他図書館"] != null
          ? Number(row["その他図書館"])
          : undefined,

      totalExperience: row["総経験年数"] !== "" ? Number(row["総経験年数"]) : 0,

      // 新しい「その他」列（数値っぽいので数値化）
      other:
        row["その他"] !== "" && row["その他"] != null
          ? Number(row["その他"])
          : undefined,

      schoolLibraryExperience: row["学校図書館経験あり"] === "はい",
    }));

  const trainingRecords = trainingRecordsRaw.map((row) => ({
    name: row["名前"] ?? "",
    trainings: [{ year: Number(row["年度"]), title: row["研修名"] ?? "" }],
  }));

  const trainingRecordByTitle: TrainingRecordByTitle[] = groupByTrainingName(
    trainingByTitleRaw as TrainingByTitleRaw[],
  );

  const trainingPrograms = trainingProgramsRaw.map((row) => ({
    name: row["研修名"] ?? "",
    targetYearRange: [
      Number(row["対象年数（最小）"] ?? 0),
      row["対象年数（最大）"] === "∞"
        ? Infinity
        : Number(row["対象年数（最大）"] ?? 0),
    ] as [number, number],
  }));

  return (
    <TrainingMatrixByProgram
      staffData={staffData}
      trainingRecords={trainingRecords}
      trainingRecordByTitle={trainingRecordByTitle}
      trainingPrograms={trainingPrograms}
    />
  );
}

// ヘルパー関数をファイル内に含める場合
function groupByTrainingName(
  rows: TrainingByTitleRaw[],
): TrainingRecordByTitle[] {
  const grouped: Record<string, { year: number; participant: string }[]> = {};

  for (const row of rows) {
    const trainingName = row["研修名"];
    const year = Number(row["年度"]);
    const participant = row["参加者"];

    if (!trainingName || isNaN(year) || !participant) continue;

    if (!grouped[trainingName]) {
      grouped[trainingName] = [];
    }

    grouped[trainingName].push({ year, participant });
  }

  return Object.entries(grouped).map(([name, entries]) => ({
    name,
    entries,
  }));
}
