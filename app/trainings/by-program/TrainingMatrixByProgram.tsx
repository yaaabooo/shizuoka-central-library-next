"use client";

import { getMarkForTraining, normalizeTitle } from "@/lib/funk/funk";
import { StaffMember, Training, TrainingRecord } from "@/lib/types/staff";
import { TrainingRecordByTitle } from "@/lib/types/staff";

type Props = {
  staffData: StaffMember[];
  trainingRecords: TrainingRecord[];
  trainingRecordByTitle: TrainingRecordByTitle[];
  trainingPrograms: Training[];
};

export default function TrainingMatrixByProgram({
  staffData,
  trainingRecords,
  trainingRecordByTitle,
  trainingPrograms,
}: Props) {
  //console.dir(trainingRecordByTitle, { depth: null });
  console.dir(trainingPrograms, { depth: null });

  return (
    <div className="h-screen bg-slate-50 p-6 overflow-x-auto overflow-y-auto">
      <div className="flex flex-nowrap gap-4 w-max">
        {trainingRecordByTitle.map((training) => {
          const participantsSet = new Set(
            training.entries.map((entry) => entry.participant),
          );

          const matchedProgram = trainingPrograms.find(
            (tp) => normalizeTitle(tp.name) === normalizeTitle(training.name),
          );

          const mark = matchedProgram
            ? getMarkForTraining(matchedProgram.targetYearRange)
            : "";

          return (
            <div
              key={training.name}
              className="min-w-[180px] bg-white border rounded-2xl shadow-md p-3"
            >
              <div className="sticky top-0 z-20 bg-white pt-1 pb-3 shadow-sm">
                <div className="text-center text-white text-sm font-bold bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-3 py-2 shadow tracking-wide">
                  <span>{mark}</span> <span>{training.name}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {staffData.map((staff) => {
                  const hasTaken = participantsSet.has(staff.name);
                  const entry = training.entries.find(
                    (e) => e.participant === staff.name,
                  );

                  return (
                    <li
                      key={staff.name + training.name}
                      className={`flex items-center gap-2 text-sm px-2 py-1 text-center rounded ${
                        hasTaken
                          ? "bg-white text-gray-800"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <span className="flex gap-1">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 text-xs font-medium">
                          {staff.experienceInThisLibrary || 0}
                        </span>
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 text-xs font-medium">
                          {staff.otherExperience || 0}
                        </span>
                      </span>
                      <span className="text-left">
                        {staff.name}
                        {hasTaken && entry ? `（${entry.year}年）` : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
