import React from 'react'
import { ButtonContainer, Form, NewExamSchedulerBodyContainer, NewExamSchedulerContainer, NewExamSchedulerHeaderContainer, NewExamSchedulerRow } from './NewExamScheduler.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import { Formik } from "formik";
import AppInput from '../../../components/AppInput/AppInput';
import {
    Button, Box, CircularProgress
  } from '@mui/material';
import useNewExamScheduler from './useNewExamScheduler';
import moment from 'moment';
import { addMinutes } from '../../../utils/helpers/global';
import { getCurrentDate, getCurrentTime } from '../../../utils/helpers/date';

const NewExamScheduler = () => {
    const location = useLocation();
    const editData = location.state;
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/exam-management/exam-scheduler');
    }
    const {
        handleClose,
        examData,
        schema,
        handleSubmit,
        handleUpdate,
        batchData
    } = useNewExamScheduler();

    const getSelectedExamDuration = (examId: string) => {
        const findData = examData?.find((item) => item?._id === examId);
        return Number(findData?.examDuration);
    }

    return (
        <NewExamSchedulerContainer>
            <NewExamSchedulerHeaderContainer>
                <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
            </NewExamSchedulerHeaderContainer>
            <NewExamSchedulerBodyContainer>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        examId: editData ? editData?.examId : '',
                        batchId: editData ? editData?.batchId : '',
                        startDate: editData ? moment(editData?.startDate).format('YYYY-MM-DD') : '',
                        startTime: editData ? editData?.startTime : '',
                        endDate: editData ? moment(editData?.endDate).format('YYYY-MM-DD') : '',
                        endTime: editData ? editData?.endTime : '',
                    }}
                    onSubmit={(values) => {
                        if (editData) {
                            handleUpdate({...values, _id: editData?._id})
                        } else {
                            handleSubmit({...values})
                        }
                    }}
                >
                    {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <NewExamSchedulerRow>
                                <AppDropDown
                                    data={examData} 
                                    placeHolder={'Please select'} 
                                    handleChange={(e) => {
                                        handleChange(e);
                                    }} 
                                    value={values?.examId}
                                    name={'examId'}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    label={'Exam Name'}
                                    minWidth={'300px'}
                                    isRequired
                                />
                                <AppDropDown
                                    data={batchData} 
                                    placeHolder={'Please select'} 
                                    handleChange={(e) => {
                                        handleChange(e);
                                    }} 
                                    value={values?.batchId}
                                    name={'batchId'}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    label={'Batch Name'}
                                    minWidth={'300px'}
                                    isRequired
                                />
                            </NewExamSchedulerRow>
                            <NewExamSchedulerRow>
                                <AppInput
                                    label='Exam Schedule Start Date :' 
                                    name='startDate' 
                                    type='date' 
                                    handleChange={(e) => handleChange(e)} 
                                    value={String(values?.startDate)} 
                                    placeholder={''} 
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    isRequired
                                />
                                <AppInput
                                    label='Exam Schedule Start Time :' 
                                    name='startTime' 
                                    type='time' 
                                    handleChange={(e) => handleChange(e)} 
                                    value={String(values?.startTime)} 
                                    placeholder={''} 
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    isRequired
                                    min={values?.startDate === getCurrentDate() && getCurrentTime()}
                                />
                            </NewExamSchedulerRow>
                            <NewExamSchedulerRow>
                                <AppInput
                                    label='Exam Schedule Expire Date :' 
                                    name='endDate' 
                                    type='date' 
                                    handleChange={(e) => handleChange(e)} 
                                    value={String(values?.endDate)} 
                                    placeholder={''} 
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    min={values?.startDate && new Date(values?.startDate).toISOString().split('T')[0]}
                                    // max={addMinutesToDateOnly(String(values?.startDate), getSelectedExamDuration(values?.examId))}
                                    isRequired
                                />
                                <AppInput
                                    label='Exam Schedule Expire Time :' 
                                    name='endTime' 
                                    type='time' 
                                    handleChange={(e) => handleChange(e)} 
                                    value={String(values?.endTime)} 
                                    placeholder={''} 
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    min={values?.startDate === values?.endDate && addMinutes(String(values?.startTime), getSelectedExamDuration(values?.examId))}
                                    // max={addMinutes(String(values?.startTime), getSelectedExamDuration(values?.examId))}
                                    isRequired
                                />
                            </NewExamSchedulerRow>
                            <ButtonContainer>
                                <Button onClick={() => handleClose()} variant="contained" color={'error'} disabled={false}>Cancel</Button>
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button variant="contained" type='submit' color={'success'}>Submit</Button>
                                    {false && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                        }}
                                    />
                                    )}
                                </Box>
                            </ButtonContainer>
                        </Form>
                    )}
                </Formik>
            </NewExamSchedulerBodyContainer>
        </NewExamSchedulerContainer>
    )
}

export default NewExamScheduler