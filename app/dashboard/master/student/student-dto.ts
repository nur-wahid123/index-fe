import { Father } from "@/source/objects/Father";
import { Gender } from "@/source/objects/gender.enum";
import { Guardian } from "@/source/objects/Guardian";
import { Mother } from "@/source/objects/Mother";
import { SemesterReport } from "@/source/types/semester-report.type";
import { StudyGroup } from "@/source/types/study-group";

export interface StundentView {
    name: string;
    studentSchoolId: number
    gender: Gender
    student_national_id: string
    placeOfBirth?: string
    dateOfBirth?: string
    nik?: string
    religion?: Religion
    address?: string
    hamlet?: string
    ward?: string
    subDistrict?: string
    postalCode?: number
    kindOfStay?: string
    transportation?: string
    telephone?: string
    phoneNumber?: string
    email?: string
    skhun?: string
    isKps: boolean
    kpsId?: string
    father?: Father
    mother?: Mother
    guardian?: Guardian
    study_group?: StudyGroup
    nationalTestNumber?: string
    graduationSertificateNumber?: string
    isKip?: boolean
    kipId?: string
    isNameInKip?: boolean
    kksId?: string
    birthCertificateRegistrationId?: string
    bank?: string
    bankAccountNumber?: string
    bankAccountName?: string
    isPipWorthy?: boolean
    reasonPipWorthy?: string
    disability?: string
    juniorSchoolName?: string
    childOrder?: number
    latitude?: string
    longitude?: string
    familyCardId?: string
    weight?: number
    height?: number
    headCircumference?: number
    numberOfSiblings?: number
    distanceFromSchool?: number
    semesterReports: SemesterReport[]
}

export interface Religion{
    id:number
    name:string
}