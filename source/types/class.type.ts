import { Stundent } from "../objects/Students";
import { StudyGroup } from "./study-group";

export interface ClassEntity{
    id: number,
    name: string,
    students: Stundent[],
    study_group: StudyGroup
}