import { Father } from "./Father";
import { Gender } from "./gender.enum";
import { Guardian } from "./Guardian";
import { Mother } from "./Mother";

export class Stundent {
    name!: string;
    studentSchoolId!: number
    gender!: Gender
    studentNationalId!: string
    placeOfBirth?: string
    dateOfBirth?: string
    nik?: string
    religion?: string
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
    isKps!: boolean
    kpsId?: string
    father?: Father
    mother?: Mother
    guardian?: Guardian
    studyGroup?: string
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
}