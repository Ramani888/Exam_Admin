import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { ISubject } from '../../../types/subject';
import { ITopic } from '../../../types/topic';
import { IQuestionType, IObjectiveQuestion } from '../../../types/question';
import { serverGetQuestionType, serverInsertObjectiveQuestion, serverGetSubject, serverGetTopic, serverUpdateObjectiveQuestion } from '../../../services/serverApi';
import { useNavigate } from 'react-router-dom';

const useAddObjectiveQuestions = (editData: any) => {
    const navigate = useNavigate();
    const [subjectData, setSubjectData] = useState<ISubject[]>([]);
    const [topicData, setTopicData] = useState<ITopic[]>([]);
    const [questionTypeData, setQuestionTypeData] = useState<IQuestionType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [rows, setRows] = useState(editData ? editData?.options : [{ id: 1, name: '', answer: false }]);
    const [canAddRow, setCanAddRow] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        // Check if any row has an empty name field
        const hasEmptyName = rows.some((row: any) => row.name.trim() === '');
        setCanAddRow(!hasEmptyName);

        // const allRowsValid = rows.every(row => row.name.trim() !== '' && row.answer !== false);
        const anyRowValid = rows.some((row: any) => row.name.trim() !== '' && row.answer !== false);
        setCanSubmit(anyRowValid);
    }, [rows]);

    const handleAddRow = () => {
        setRows([...rows, { id: rows.length + 1, name: '', answer: false }]);
    };

    const handleDeleteRow = (id: number) => {
        if (rows.length > 1) {
        const filterData = rows.filter((row: any) => row.id !== id);
        const finalData = filterData.map((item: any, index: number) => ({
            ...item,
            id: index + 1 
        }));
        setRows(finalData);
        }
    };

    const handleTitleChange = (id: number, e: any) => {
        const { name, value, type, checked } = e.target;
        const updatedRows = rows.map((row: any) => 
        row.id === id ? { ...row, [name]: type === 'checkbox' ? checked : value } : row
        );
        setRows(updatedRows);
    };

    const schema = Yup.object().shape({
        subjectId: Yup.string().required("Please select a subject.*"),
        topicId: Yup.string().required("Please select a topic.*"),
        questionTypeId: Yup.string().required("Please select a question type.*"),
        question: Yup.string().required("Please enter a question.*"),
        mark: Yup.string().required("Please enter a mark.*")
    });

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);
            await serverInsertObjectiveQuestion(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/question-bank/objective-questions')
            setLoading(false);
        }
    };

    const handleUpdate = async (data: IObjectiveQuestion) => {
        try {
            setLoading(true);
            await serverUpdateObjectiveQuestion(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/question-bank/objective-questions')
            setLoading(false);
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

    useEffect(() => {
        getSubjectData()
        getTopicData()
        getQuestionTypeData()
    }, [])

    const handleClose = () => {
        navigate('/question-bank/objective-questions')
    }

    return {
        schema,
        subjectData,
        topicData,
        questionTypeData,
        loading,
        handleClose,
        rows,
        handleAddRow,
        handleDeleteRow,
        handleTitleChange,
        canAddRow,
        canSubmit,
        handleSubmit,
        handleUpdate
    }
}

export default useAddObjectiveQuestions