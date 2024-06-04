import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { serverGetExamType, serverGetQuestionType, serverGetSubject, serverGetTopic } from '../../../services/serverApi';
import { IExamType } from '../../../types/exam';
import { IQuestionType } from '../../../types/question';
import { ISubject } from '../../../types/subject';
import { ITopic } from '../../../types/topic';

const useNewExamCreation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [examTypeData, setExamTypeData] = useState<IExamType[]>([]);
  const [subjectData, setSubjectData] = useState<ISubject[]>([]);
  const [topicData, setTopicData] = useState<ITopic[]>([]);
  const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    name: Yup.string().required("Enater exam name.*"),
    examDuration: Yup.string().required("Enter exam duration.*"),
    examTypeId: Yup.string().required("Select exam type.*"),
  });

  const handleClose = () => {
    navigate('/exam-management/exam-creation')
  }

  const getExamTypeData = async () => {
    try {
      setLoading(true)
      const data = await serverGetExamType();
      setExamTypeData(data?.data)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setExamTypeData([])
      setLoading(false)
    }
  }

  const getTopicData = async () => {
    try {
        setLoading(true);
        const data = await serverGetTopic();
        setTopicData(data?.data)
    } catch (err) {
        console.error(err);
        setLoading(false);
    } finally {
        setLoading(false)
    }
  }

  const getQuestionTypeData = async () => {
    try {
        setLoading(true);
        const data = await serverGetQuestionType();
        setQuestionTypeData(data?.data)
    } catch (err) {
        console.error(err);
        setQuestionTypeData([])
        setLoading(false);
    } finally {
        setLoading(false)
    }
  }

  const getSubjectData = async () => {
    try {
        setLoading(true);
        const data = await serverGetSubject();
        setSubjectData(data?.data)
    } catch (err) {
        console.error(err);
        setLoading(false);
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    getExamTypeData();
    getSubjectData();
    getTopicData();
    getQuestionTypeData();
  }, [])
  
  return {
    schema,
    handleClose,
    examTypeData,
    subjectData,
    topicData,
    questionTypeData
  }
}

export default useNewExamCreation