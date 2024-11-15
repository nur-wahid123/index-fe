import CONFIG from "./config"

const ENDPOINT = {
    //Dashboard
    DASHBOARD: `${CONFIG.BASE_URL}/dashboard/data`,

    //Report
    REPORT : `${CONFIG.BASE_URL}/semester-report/list`,
    CREATE_REPORT : `${CONFIG.BASE_URL}/semester-report/create/batch`,

    //Student
    STUDENT_CREATE_BATCH: `${CONFIG.BASE_URL}/students/create-batch`,
    MASTER_STUDENT: `${CONFIG.BASE_URL}/students/list`,

    //Subject
    SUBJECT_CREATE_BATCH: `${CONFIG.BASE_URL}/subjects/create-batch`,
    CREATE_SUBJECT: `${CONFIG.BASE_URL}/subjects/create`,
    DETAIL_SUBJECT: `${CONFIG.BASE_URL}/subjects/detail`,
    UPDATE_SUBJECT: `${CONFIG.BASE_URL}/subjects/update`,
    DELETE_SUBJECT: `${CONFIG.BASE_URL}/subjects/delete`,
    MASTER_SUBJECT: `${CONFIG.BASE_URL}/subjects/list`,

    //Subject
    CREATE_CLASS: `${CONFIG.BASE_URL}/class/create`,
    DETAIL_CLASS: `${CONFIG.BASE_URL}/class/detail`,
    UPDATE_CLASS: `${CONFIG.BASE_URL}/class/update`,
    DELETE_CLASS: `${CONFIG.BASE_URL}/class/delete`,
    MASTER_CLASS: `${CONFIG.BASE_URL}/class/list`,

    //Study Group
    CREATE_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups/create`,
    DETAIL_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups/detail`,
    UPDATE_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups/update`,
    MASTER_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups/list`,
    DELETE_STUDY_GROUP: `${CONFIG.BASE_URL}/study-groups/delete`,
    LINK_STUDY_SUBJECT: `${CONFIG.BASE_URL}/study-groups/link-subject`,
    DETACH_STUDY_SUBJECT: `${CONFIG.BASE_URL}/study-groups/detach-subject`,
    LINK_STUDY_SUBJECT_BATCH: `${CONFIG.BASE_URL}/study-groups/link-batch-subject`,

    //Authentication
    LOGIN: `${CONFIG.BASE_URL}/auth/login`,
    GET_PROFILE: `${CONFIG.BASE_URL}/auth/profile`,
    LOGOUT: `${CONFIG.BASE_URL}/auth/logout`,

} as const

export default ENDPOINT