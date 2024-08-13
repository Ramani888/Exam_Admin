import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { serverGetCandidata } from '../../../services/serverApi';
import { ICandidate } from '../../../types/candidate';

const useNewBatch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [candidateData, setCandidateData] = useState<ICandidate[]>([])
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        name: Yup.string().required("Please enter a batch name.*"),
        discription: Yup.string().required("Please enter a discription.*")
    });


    const handleClose = () => {
        navigate('/candidates/batch')
    }

    const getCandidateData = async () => {
        try {
            setLoading(true);
            const data = await serverGetCandidata();
            setCandidateData(data?.data)
        } catch (err) {
            console.error(err);
            setCandidateData([]);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCandidateData()
    }, [])

    return {
        schema,
        handleClose,
        loading,
        candidateData
    }
}

export default useNewBatch