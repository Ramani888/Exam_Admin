import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverGetExamData } from '../../../services/serverApi';
import { IExam } from '../../../types/exam';

const useNewExamScheduler = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [examData, setExamData] = useState<IExam[]>([]);

    const handleClose = () => {
        navigate('/exam-management/exam-scheduler')
    }

    const getExamData = async () => {
        try {
            setLoading(true);
            const data = await serverGetExamData();
            setExamData(data?.data)
        } catch (err) {
            console.error(err);
            setExamData([]);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getExamData()
    }, [])

    return {
        handleClose,
        examData,
        loading
    }
}

export default useNewExamScheduler