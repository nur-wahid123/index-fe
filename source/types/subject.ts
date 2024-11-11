import { StudyGroup } from "./study-group"

export interface Subject{
    id:number
    name: string
    study_groups:StudyGroup[]
    is_primary: boolean
}