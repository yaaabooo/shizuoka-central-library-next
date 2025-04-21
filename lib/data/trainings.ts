export type Training = {
  name: string;
  targetYearRange: [number, number]; // 数値の範囲（例: [4, 10]）
};

export const trainingPrograms: Training[] = [
  { name: "県立・県図協公立図書館研修", targetYearRange: [1, 1] },
  { name: "著作権セミナー", targetYearRange: [2, 2] },
  {
    name: "全国書誌データ・レファレンス協同DB利活用研修",
    targetYearRange: [2, 2],
  },
  { name: "多文化サービス研修", targetYearRange: [2, 2] },
  { name: "障害者サービス担当職員向け講座", targetYearRange: [3, 3] },
  { name: "中堅職員ステップアップ研修（1）", targetYearRange: [4, 10] },
  { name: "児童図書館員のための初級研修プログラム", targetYearRange: [4, 10] },
  { name: "関東甲信越静地区公共図書館地区別研修会", targetYearRange: [4, 10] },
  {
    name: "レファレンスサービス研修「人文情報の調べ方」",
    targetYearRange: [4, 10],
  },
  { name: "資料保存研修", targetYearRange: [4, 10] },
  {
    name: "レファレンスサービス研修「科学技術情報の調べ方」",
    targetYearRange: [4, 10],
  },
  { name: "資料デジタル化研修", targetYearRange: [4, 10] },
  {
    name: "レファレンスサービス研修「経済社会情報の調べ方」",
    targetYearRange: [4, 10],
  },
  { name: "法令・議会・官庁資料研修", targetYearRange: [4, 10] },
  { name: "図書館司書専門講座", targetYearRange: [8, 12] },
  { name: "中堅職員ステップアップ研修（2）", targetYearRange: [8, 12] },
  { name: "ビジネスライブラリアン講習会", targetYearRange: [8, 20] },
  { name: "JMLAコア研修", targetYearRange: [8, 20] },
  { name: "アーカイブスカレッジ短期コース", targetYearRange: [8, 20] },
  { name: "国立国会図書館受託研究員及び受託研修生", targetYearRange: [16, 25] },
  { name: "新任館長研修", targetYearRange: [25, Infinity] },
];
