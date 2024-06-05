import { ExamType } from "../../types/exam.d"

export const getExamType = (examTypeId: number) => {
    switch (examTypeId) {
        case ExamType.SubjectiveExam:
            return 'Subjective exam'
        case ExamType.ObjectiveExam:
            return 'Objective exam'
        case ExamType.Both:
            return 'Both'
        default:
            return ''
    }
}