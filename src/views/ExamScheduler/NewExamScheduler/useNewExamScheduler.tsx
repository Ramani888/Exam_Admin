import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverGetBatch, serverGetExamData, serverInsertExamSchedule, serverUpdateExamSchedule } from '../../../services/serverApi';
import { IExam, IExamSchedule } from '../../../types/exam';
import * as Yup from "yup";
import { IBatch } from '../../../types/batch';

const useNewExamScheduler = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [examData, setExamData] = useState<IExam[]>([]);
    const [batchData, setBatchData] = useState<IBatch[]>([]);

    const schema = Yup.object().shape({
        examId: Yup.string().required("Please select a exam.*"),
        batchId: Yup.string().required("Please select a batch.*"),
        startDate: Yup.string().required("Please select a start date.*"),
        startTime: Yup.string().required("Please select a start time.*"),
        endDate: Yup.string().required("Please select a end date.*"),
        endTime: Yup.string().required("Please select a end time.*")
    });

    const handleClose = () => {
        navigate('/exam-management/exam-scheduler')
    }

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);
            await serverInsertExamSchedule(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/exam-management/exam-scheduler')
            setLoading(false);
        }
    };

    const handleUpdate = async (data: any) => {
        try {
            setLoading(true);
            await serverUpdateExamSchedule(data);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            navigate('/exam-management/exam-scheduler')
            setLoading(false);
        }
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

    const getBatchData = async () => {
        try {
            setLoading(true);
            const data = await serverGetBatch();
            setBatchData(data?.data)
        } catch (err) {
            console.error(err);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getExamData()
        getBatchData()
    }, [])

    return {
        handleClose,
        examData,
        loading,
        schema,
        handleSubmit,
        handleUpdate,
        batchData
    }
}

export default useNewExamScheduler