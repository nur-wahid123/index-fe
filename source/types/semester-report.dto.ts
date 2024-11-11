import { ExtracurricularScoreEnum } from "../enums/extraculicullar-score.enum";

export class CreateSemesterReportDto {
    studentNationalId!: string;

    scores!: Score[];
        
    extracurricularScores!: ExtracurricularScore[];

    totalScore!: number;

    ranking!: number;

    sickDays!: number;

    absentDays!: number;

    schoolYear!:string;
  
    leaveDays!: number;

    semester!: string;
}

export class Score {
    subjectName!: string;

    score!: number;
}

export class ExtracurricularScore {
    extracurricularName!: string;

    score!: ExtracurricularScoreEnum;
}