import React, { useEffect, useState } from 'react'
import { IExam } from '../../../types/exam';
import { serverGetBatch, serverGetCandidata, serverGetExamData, serverInsertCandidate, serverUpdateCandidata } from '../../../services/serverApi';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { ICandidate } from '../../../types/candidate';
import { IBatch } from '../../../types/batch';
import { deleteSingleImage, generatePassword, isUrlString, uploadBase64SingleImage } from '../../../utils/helpers/global';

const useNewCandidates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [batchData, setBatchData] = useState<IBatch[]>([]);

  const schema = Yup.object().shape({
    batchId: Yup.string().required("Please select a batch.*"),
    rollNumber: Yup.string().required("Please enter a roll number.*"),
    firstName: Yup.string().required("Please enter a first name.*"),
    lastName: Yup.string().required("Please enter a last name.*"),
    // middleName: Yup.string().required("Please enter a middle name.*"),
    email: Yup.string().required("Please enter a email.*"),
    // number: Yup.string().required("Please enter a mobile number.*")
  });

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

  const handleClose = () => {
    navigate('/candidates/candidate-data')
  }

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      const imagesUrl = await uploadBase64SingleImage(data?.imageSrc, `candidate`, 'image/jpeg');
      const password = generatePassword();
      console.log('password', password)
      delete data.imageSrc;
      await serverInsertCandidate({...data, profileImg: imagesUrl, password: password});
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      navigate('/candidates/candidate-data')
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
        setLoading(true);
        if (!isUrlString(data?.imageSrc)) {
          const imagesUrl = await uploadBase64SingleImage(data?.imageSrc, `candidate`, 'image/jpeg');
          await deleteSingleImage(data?.deleteProfileImg)
          delete data.imageSrc;
          await serverUpdateCandidata({...data, profileImg: imagesUrl});
        } else {
          await serverUpdateCandidata({...data, profileImg: data?.imageSrc});
        }
    } catch (err) {
        console.log(err);
        setLoading(false);
    } finally {
        navigate('/candidates/candidate-data')
        setLoading(false);
    }
  }


  useEffect(() => {
    getBatchData();
  }, [])

  return {
    batchData,
    handleClose,
    schema,
    handleSubmit,
    handleUpdate,
    loading
  }
}

export default useNewCandidates