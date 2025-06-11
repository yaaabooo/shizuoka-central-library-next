export type StaffMember = {
  name: string;
  role: string;
  experienceInThisLibrary: number;
  otherExperience?: number;
  totalExperience: number;
  schoolLibraryExperience: boolean;
};

export type Training = {
  name: string;
  targetYearRange: [number, number]; // 例: [4, 10]
};

export type TrainingRecord = {
  name: string;
  trainings: {
    year: number | null;
    title: string;
  }[];
};

export type TrainingRecordByTitle = {
  name: string; // 研修名
  entries: {
    year: number;
    participant: string;
  }[];
};

export type TrainingByTitleRaw = {
  研修名: string;
  年度: string;
  参加者: string;
};
