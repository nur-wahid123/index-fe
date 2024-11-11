import { Stundent } from "@/source/objects/Students"
import { Subject } from "./subject"

export interface StudyGroup {
    id: number
    name: string
    subjects: Subject[]
    students: Stundent[]
}