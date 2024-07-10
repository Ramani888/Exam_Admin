import { IBanner } from "../types/banner";
import { ICandidate } from "../types/candidate";
import { IExam, IExamSchedule } from "../types/exam";
import { IProduct } from "../types/product";
import { ISubjectiveQuestion } from "../types/question";
import { ISubject } from "../types/subject";
import { IUsers } from "../types/user";
import { TOKEN } from "../utils/consts/globalConst";
import axios, { Method } from "axios";
import { StatusCodes } from "http-status-codes";

// const serverUrl = "http://localhost:3010/api";
const serverUrl = "https://exam-backend-eta.vercel.app/api";

const errorCodes = [
  StatusCodes.INTERNAL_SERVER_ERROR,
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.CONFLICT,
];

const serverRequest = async (
  url: string,
  command: Method,
  data: any,
  token?: boolean,
  isForm?: boolean
) => {
  const headers: HeadersInit = {
    Accept: "application/json, text/plain, */*",
  };

  if (token) {
    headers.authorization = TOKEN;
  }

  const params: RequestInit = {
    method: command,
    mode: "cors",
    cache: "no-cache",
    headers: headers,
  };

  if (data && !isForm) {
    (params.headers as any)["Content-Type"] = "application/json";
    params.body = JSON.stringify(data);
  } else if (isForm) {
    params.body = data;
  }

  try {
    const config = {
      url: serverUrl + url,
      headers: headers,
      method: command,
      timeout: 60000,
      data: data,
    };
    const response = await axios(config);

    let res = await response.data;

    if (errorCodes.includes(response.status)) {
      throw res;
    }

    return res;
  } catch (e) {
    throw e;
  }
};

////////// Subject Api ///////////
export const serverGetSubject = async () => {
  const res = await serverRequest('/subject', 'GET', null, true);
  return res
}

export const serverInsertSubject = async (data: ISubject) => {
  const res = await serverRequest('/subject', 'POST', data, true);
  return res
}

export const serverDeleteSubject = async (subjectId: string) => {
  const res = await serverRequest(`/subject?subjectId=${subjectId}`, 'DELETE', null, true);
  return res
}

export const serverUpdateSubject = async (data: ISubject) => {
  const res = await serverRequest(`/subject`, 'PUT', data, true);
  return res
}

////////// Batch Api ///////////
export const serverGetBatch = async () => {
  const res = await serverRequest('/batch', 'GET', null, true);
  return res
}

export const serverInsertBatch = async (data: ISubject) => {
  const res = await serverRequest('/batch', 'POST', data, true);
  return res
}

export const serverDeleteBatch = async (batchId: string) => {
  const res = await serverRequest(`/batch?batchId=${batchId}`, 'DELETE', null, true);
  return res
}

export const serverUpdateBatch = async (data: ISubject) => {
  const res = await serverRequest(`/batch`, 'PUT', data, true);
  return res
}

////////// Topic Api ///////////
export const serverGetTopic = async () => {
  const res = await serverRequest('/topic', 'GET', null, true);
  return res
}

export const serverInsertTopic = async (data: ISubject) => {
  const res = await serverRequest('/topic', 'POST', data, true);
  return res
}

export const serverDeleteTopic = async (topicId: string) => {
  const res = await serverRequest(`/topic?topicId=${topicId}`, 'DELETE', null, true);
  return res
}

export const serverUpdateTopic = async (data: ISubject) => {
  const res = await serverRequest(`/topic`, 'PUT', data, true);
  return res
}

////////// Subjective Question Api ///////////
export const serverGetSubjectiveQuestion = async () => {
  const res = await serverRequest('/question/subjective', 'GET', null, true);
  return res
}

export const serverInsertSubjectiveQuestion = async (data: ISubjectiveQuestion) => {
  const res = await serverRequest('/question/subjective', 'POST', data, true);
  return res
}

export const serverDeleteSubjectiveQuestion = async (questionId: string) => {
  const res = await serverRequest(`/question/subjective?questionId=${questionId}`, 'DELETE', null, true);
  return res
}

export const serverUpdateSubjectiveQuestion = async (data: ISubjectiveQuestion) => {
  const res = await serverRequest(`/question/subjective`, 'PUT', data, true);
  return res
}


////////// Subjective Objective Api ///////////
export const serverGetObjectiveQuestion = async () => {
  const res = await serverRequest('/question/objective', 'GET', null, true);
  return res
}

export const serverInsertObjectiveQuestion = async (data: ISubjectiveQuestion) => {
  const res = await serverRequest('/question/objective', 'POST', data, true);
  return res
}

export const serverDeleteObjectiveQuestion = async (questionId: string) => {
  const res = await serverRequest(`/question/objective?questionId=${questionId}`, 'DELETE', null, true);
  return res
}

export const serverUpdateObjectiveQuestion = async (data: ISubjectiveQuestion) => {
  const res = await serverRequest(`/question/objective`, 'PUT', data, true);
  return res
}

export const serverGetQuestionType = async () => {
  const res = await serverRequest('/question/type', 'GET', null, true);
  return res
}


////////// Exam Api ///////////
export const serverGetExamType = async () => {
  const res = await serverRequest('/exam/type', 'GET', null, true);
  return res
}

export const serverGetExamQuestion = async (examTypeId: number, questionTypeId: string[], subjectId: string, topicId: string) => {
  const res = await serverRequest(`/exam/question?examTypeId=${examTypeId}&questionTypeId=${questionTypeId}&subjectId=${subjectId}&topicId=${topicId}`, 'GET', null, true);
  return res
}

export const serverInsertExam = async (data: IExam) => {
  const res = await serverRequest('/exam', 'POST', data, true);
  return res
}

export const serverGetExamData = async () => {
  const res = await serverRequest('/exam', 'GET', null, true);
  return res
}

export const serverDeleteExam = async (examId: string) => {
  const res = await serverRequest(`/exam?examId=${examId}`, 'DELETE', null, true);
  return res
}


////////// Exam Schedule Api ///////////
export const serverInsertExamSchedule = async (data: IExamSchedule) => {
  const res = await serverRequest('/exam/schedule', 'POST', data, true);
  return res
}

export const serverGetExamSchedule = async () => {
  const res = await serverRequest('/exam/schedule', 'GET', null, true);
  return res
}

export const serverUpdateExamSchedule = async (data: IExamSchedule) => {
  const res = await serverRequest('/exam/schedule', 'PUT', data, true);
  return res
}

export const serverDeleteExamSchedule = async (examScheduleId: string) => {
  const res = await serverRequest(`/exam/schedule?examScheduleId=${examScheduleId}`, 'DELETE', null, true);
  return res
}


////////// Candidate Data Api ///////////
export const serverInsertCandidate = async (data: ICandidate) => {
  const res = await serverRequest('/candidate', 'POST', data, true);
  return res
}

export const serverGetCandidata = async () => {
  const res = await serverRequest('/candidate', 'GET', null, true);
  return res
}

export const serverDeleteCandidate = async (candidateId: string) => {
  const res = await serverRequest(`/candidate?candidateId=${candidateId}`, 'DELETE', null, true);
  return res
}

export const serverUpdateCandidata = async (data: ICandidate) => {
  const res = await serverRequest(`/candidate`, 'PUT', data, true);
  return res
}

////////// Admin Login ///////////
export const serverAdminLogin = async (data: {email: string, password: string}) => {
  const res = await serverRequest('/admin/login', 'POST', data, true);
  return res
}

////////// Demo Request Api ///////////
export const serverGetDemoRequest = async () => {
  const res = await serverRequest('/demo/request', 'GET', null, true);
  return res
}