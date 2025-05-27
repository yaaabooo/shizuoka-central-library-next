"use client";

import { staffData } from "@/lib/data/staff";
import { trainingPrograms } from "@/lib/data/trainings";
import { trainingRecords } from "@/lib/data/trainingRecords";

export default function HorizontalScrollTrainingMatrix() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 overflow-x-auto">
      <div className="flex flex-nowrap gap-6 w-max">
        {staffData.map((staff) => {
          const record = trainingRecords.find((r) => r.name === staff.name);

          return (
            <div
              key={staff.name}
              className="min-w-[220px] bg-white border rounded-2xl shadow-lg p-4"
            >
              <div className="flex items-center justify-center gap-2 text-white text-sm font-bold bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full px-4 py-2 mb-4 shadow-md tracking-wide">
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

              <ul className="space-y-2">
                {trainingPrograms.map((training) => {
                  const hasTaken = record?.trainings.some((t) =>
                    t.title.includes(training.name)
                  );

                  const [minYear, maxYear] = training.targetYearRange;
                  const isTarget =
                    staff.totalExperience >= minYear &&
                    staff.totalExperience <= maxYear;

                  const bgClass = hasTaken
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : isTarget
                    ? "bg-yellow-100 text-yellow-800"
                    : "text-gray-400 bg-white";

                  return (
                    <li
                      key={training.name}
                      className={`text-sm py-2 px-3 rounded-lg shadow-sm border text-center transition-colors duration-150 ${bgClass}`}
                    >
                      {hasTaken ? "✔️ " : ""}
                      {training.name}
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
