import CONFIG from "./config"

const ENDPOINT = {
    REPORT : `${CONFIG.BASE_URL}/semester-report/list`,
    CREATE_REPORT : `${CONFIG.BASE_URL}/semester-report/create/batch`,
    STUDENT_CREATE_BATCH: `${CONFIG.BASE_URL}/students/create-batch`,
    SUBJECT_CREATE_BATCH: `${CONFIG.BASE_URL}/subjects/create-batch`,
    MASTER_STUDENT: `${CONFIG.BASE_URL}/students/list`,
    MASTER_SUBJECT: `${CONFIG.BASE_URL}/subjects`,
    MASTER_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups`,
    LINK_STUDY_SUBJECT: `${CONFIG.BASE_URL}/study-groups/link-subject`,
    DETACH_STUDY_SUBJECT: `${CONFIG.BASE_URL}/study-groups/detach-subject`,
    LINK_STUDY_SUBJECT_BATCH: `${CONFIG.BASE_URL}/study-groups/link-batch-subject`,

} as const

export default ENDPOINT