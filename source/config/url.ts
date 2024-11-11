import CONFIG from "./config"

const ENDPOINT = {
    //Report
    REPORT : `${CONFIG.BASE_URL}/semester-report/list`,
    CREATE_REPORT : `${CONFIG.BASE_URL}/semester-report/create/batch`,

    //Student
    STUDENT_CREATE_BATCH: `${CONFIG.BASE_URL}/students/create-batch`,
    MASTER_STUDENT: `${CONFIG.BASE_URL}/students/list`,

    //Subject
    SUBJECT_CREATE_BATCH: `${CONFIG.BASE_URL}/subjects/create-batch`,
    MASTER_SUBJECT: `${CONFIG.BASE_URL}/subjects`,

    //Study Group
    MASTER_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups`,
    LINK_STUDY_SUBJECT: `${CONFIG.BASE_URL}/study-groups/link-subject`,
    DETACH_STUDY_SUBJECT: `${CONFIG.BASE_URL}/study-groups/detach-subject`,
    LINK_STUDY_SUBJECT_BATCH: `${CONFIG.BASE_URL}/study-groups/link-batch-subject`,

    //Authentication
    LOGIN: `${CONFIG.BASE_URL}/auth/login`,
    LOGOUT: `${CONFIG.BASE_URL}/auth/logout`,

} as const

export default ENDPOINT