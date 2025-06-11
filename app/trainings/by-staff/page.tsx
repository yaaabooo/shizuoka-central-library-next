export const dynamic = "force-dynamic";

import { fetchMultipleSheetsSecure } from "@/lib/sheets/fetchSheetSecure";
import HorizontalScrollTrainingMatrix from "./HorizontalScrollTrainingMatrix";

export default async function Page() {
  const {
    staffRaw,
    trainingRecordsRaw,
    trainingByTitleRaw: _trainingByTitleRaw,
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
    <HorizontalScrollTrainingMatrix
      staffData={staffData}
      trainingRecords={trainingRecords}
      trainingPrograms={trainingPrograms}
    />
  );
}
