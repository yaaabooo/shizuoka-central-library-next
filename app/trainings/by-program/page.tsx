export const revalidate = 60;

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

  const staffData = staffRaw.map((row) => ({
    name: row["名前"] ?? "",
    role: row["役職"] ?? "",
    experienceInThisLibrary: Number(row["当館経験年数"]),
    otherExperience: row["その他経験年数"]
      ? Number(row["その他経験年数"])
      : undefined,
    totalExperience: Number(row["総経験年数"]),
    schoolLibraryExperience: row["学校図書館経験あり"] === "はい",
  }));

  const trainingRecords = trainingRecordsRaw.map((row) => ({
    name: row["名前"] ?? "",
    trainings: [{ year: Number(row["年度"]), title: row["研修名"] ?? "" }],
  }));

  const trainingRecordByTitle: TrainingRecordByTitle[] = groupByTrainingName(
    trainingByTitleRaw as TrainingByTitleRaw[]
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
  rows: TrainingByTitleRaw[]
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
