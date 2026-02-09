"use client";

import { getMarkForTraining, normalizeTitle } from "@/lib/funk/funk";
import type { StaffMember, TrainingRecord, Training } from "@/lib/types/staff";

export default function HorizontalScrollTrainingMatrix({
  staffData,
  trainingRecords,
  trainingPrograms,
}: {
  staffData: StaffMember[];
  trainingRecords: TrainingRecord[];
  trainingPrograms: Training[];
}) {
  console.dir(trainingRecords, { depth: null });

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 overflow-x-auto overflow-y-auto">
      <div className="flex flex-nowrap gap-6 w-max">
        {staffData.map((staff) => {
          const records = trainingRecords.filter((r) => r.name === staff.name);

          return (
            <div
              key={staff.name}
              className="min-w-[220px] bg-white border rounded-2xl shadow-lg p-4"
            >
              {/* スタッフ名ヘッダー */}
              <div className="sticky top-0 z-20 bg-white pt-1 pb-3 shadow-sm">
                <div className="flex items-center justify-center gap-2 text-white text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full px-4 py-2 shadow-md tracking-wide">
                  <span>{staff.name}</span>
                  <span className="flex gap-1">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-indigo-700 text-xs font-semibold">
                      {staff.experienceInThisLibrary || 0}
                    </span>
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-purple-700 text-xs font-semibold">
                      {staff.otherExperience || 0}
                    </span>
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {/* 公式の研修一覧 */}
                {trainingPrograms.map((training) => {
                  const [minYear, maxYear] = training.targetYearRange;
                  const isTarget =
                    staff.totalExperience >= minYear &&
                    staff.totalExperience <= maxYear;

                  const hasTaken = records.some((record) => 
                    record.trainings.some(
                      (t) =>
                        normalizeTitle(t.title) ===
                        normalizeTitle(training.name),
                    ),
                  );

                  const bgClass = hasTaken
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : isTarget
                      ? "bg-yellow-100 text-yellow-800"
                      : "text-gray-400 bg-white";

                  const mark = training
                    ? getMarkForTraining(training.targetYearRange)
                    : "";

                  return (
                    <li
                      key={training.name}
                      className={`text-sm py-2 px-3 rounded-lg shadow-sm border transition-colors duration-150 ${bgClass} flex items-center justify-start gap-x-2`}
                    >
                      {hasTaken && <span>✔️</span>}
                      <span>{mark}</span>
                      <span className="text-left">{training.name}</span>
                    </li>
                  );
                })}

                {/* その他の受講研修 */}
                {(() => {
                  // すべての受講研修タイトルを集める
                  const allTakenTitles = records.flatMap((r) =>
                    r.trainings.map((t) => t.title),
                  );

                  const normalizedProgramNames = trainingPrograms.map((tp) =>
                    normalizeTitle(tp.name),
                  );

                  const extraTrainings = [
                    ...new Set(
                      allTakenTitles.filter(
                        (title) =>
                          !normalizedProgramNames.includes(
                            normalizeTitle(title),
                          ),
                      ),
                    ),
                  ];

                  if (extraTrainings.length === 0) return null;

                  return (
                    <>
                      <li className="mt-4 text-xs text-gray-500 font-bold">
                        その他の受講研修
                      </li>
                      {extraTrainings.map((title) => (
                        <li
                          key={title}
                          className="text-sm py-2 px-3 rounded-lg shadow-sm border text-left bg-green-50 text-green-900"
                        >
                          ✔️ {title}
                        </li>
                      ))}
                    </>
                  );
                })()}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
