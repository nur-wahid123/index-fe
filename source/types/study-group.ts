import { Stundent } from "@/source/objects/Students"
import { Subject } from "./subject"
import { ClassEntity } from "./class.type"

export interface StudyGroup {
    id: number
    name: string
    subjects: Subject[]
    classes: ClassEntity[]
}