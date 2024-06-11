export interface IExamType {
    _id?: ObjectId;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ExamType {
    SubjectiveExam,
    ObjectiveExam,
    Both
}

export const examTypeData = [
    {
        _id: ExamType.SubjectiveExam,
        name: "Subjective exam"
    },
    {
        _id: ExamType.ObjectiveExam,
        name: "Objective exam"
    },
    {
        _id: ExamType.Both,
        name: "Both"
    }
]

export interface IExamQuestion {
    _id?: ObjectId;
    subjectId: string;
    topicId: string;
    questionTypeId: string;
    question: string;
    mark: number;
    options?: IOption[];
    index: number;
    selected: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IQuestion {
    questionId: string;
}
  
export interface IExam {
    _id?: ObjectId;
    name: string;
    isInstantScoreView: boolean;
    isCandidateReviewExam: boolean;
    examDuration: number;
    examTypeId: string;
    isNegativeMarking: boolean;
    negativeMark: number;
    isEachQuestionTime: boolean;
    eachQuestionTime: number;
    isRandomQuestion: boolean;
    isCapturePhoto: boolean;
    photoTimeInterval: number;
    isQuestionNavigation: boolean;
    subjectId: string;
    topicId: string;
    questionTypeId: string[];
    passingMark: number;
    totalMark: number;
    questions: IQuestion[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IExamSchedule{
    _id?: string;
    examId: string;
    startDate: Date;
    startTime: Date;
    endDate: Date;
    endTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}