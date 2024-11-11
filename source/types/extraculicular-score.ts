import { ExtracurricularScoreEnum } from "../enums/extraculicullar-score.enum"
import { Extraculicular } from "./extraculicular"

export interface ExtracurricularScore{
    id: number  
    scoreValue: ExtracurricularScoreEnum
    extracurricular: Extraculicular
}