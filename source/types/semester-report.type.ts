import { Stundent } from "@/app/(objects)/Students";
import { Score } from "./score";
import { ExtracurricularScore } from "./extraculicular-score";

export interface SemesterReport{
    semester?: string;
    student: Stundent;
    scores: Score[];
    extracurricularScores: ExtracurricularScore[]
    schholYear: number;
    totalScore: number;
    averageScore: number;
    sickDays: number;
    absentDays: number;
    leaveDays: number;
    ranking: number;
}