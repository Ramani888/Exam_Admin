export interface ISubjectiveQuestion {
    _id?: ObjectId;
    subjectId: string;
    topicId: string;
    questionTypeId: string;
    question: string;
    mark: number;
    createdAt?: Date;
    updatedAt?: Date;
    answerKeyData?: {id: number, name: string}[];
}

export interface IQuestionType {
    _id?: ObjectId;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IOption {
    name: string;
    answer: boolean;
}

export interface IObjectiveQuestion extends Document {
    _id?: ObjectId;
    subjectId: string;
    topicId: string;
    questionTypeId: string;
    question: string;
    mark: number;
    options: IOption[];
    createdAt?: Date;
    updatedAt?: Date;
}