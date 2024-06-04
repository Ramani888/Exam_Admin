import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { ISubject } from '../../../types/subject';
import { serverGetQuestionType, serverGetSubject, serverGetTopic, serverInsertSubjectiveQuestion, serverUpdateSubjectiveQuestion } from '../../../services/serverApi';
import { ITopic } from '../../../types/topic';
import { IQuestionType, ISubjectiveQuestion } from '../../../types/question';

const useAddSubjectiveQuestions = () => {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const schema = Yup.object().shape({
        subjectId: Yup.string().required("Please select a subject.*"),
        topicId: Yup.string().required("Please select a topic.*"),
        questionTypeId: Yup.string().required("Please select a question type.*"),
        question: Yup.string().required("Please enter a question.*"),
        mark: Yup.string().required("Please enter a mark.*")
    });

    const handleClose = () => {
        navigate('/question-bank/subjective-questions')
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

    const handleSubmit = async (data: ISubjectiveQuestion) => {
        try {
            setLoading(true);
            await serverInsertSubjectiveQuestion(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/question-bank/subjective-questions')
            setLoading(false);
        }
    };

    const handleUpdate = async (data: ISubjectiveQuestion) => {
        try {
            setLoading(true);
            await serverUpdateSubjectiveQuestion(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/question-bank/subjective-questions')
            setLoading(false);
        }
    }

    useEffect(() => {
        getSubjectData()
        getTopicData()
        getQuestionTypeData()
    }, [])

    return {
        schema,
        handleClose,
        subjectData,
        loading,
        topicData,
        questionTypeData,
        handleSubmit,
        handleUpdate
    }
}

export default useAddSubjectiveQuestions