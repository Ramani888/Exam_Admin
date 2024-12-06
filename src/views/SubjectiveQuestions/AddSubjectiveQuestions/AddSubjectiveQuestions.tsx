import React from 'react'
import { AddSubjectiveQuestionsBodyContainer, AddSubjectiveQuestionsContainer, AddSubjectiveQuestionsHeaderContainer, ButtonContainer, Form, SubjectTopicTypeContainer } from './AddSubjectiveQuestions.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import TextEditor from '../../../components/TextEditor/TextEditor';
import useAddSubjectiveQuestions from './useAddSubjectiveQuestions';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import { Formik } from "formik";
import AppInput from '../../../components/AppInput/AppInput';
import { Box, Button, CircularProgress } from '@mui/material';
import { removeHtmlTags } from '../../../utils/consts/globalConst';
import {
    MaterialReactTable
} from 'material-react-table';

const AddSubjectiveQuestions = () => {
    const location = useLocation();
    const editData = location.state;
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/question-bank/subjective-questions');
    }
    const {
        schema,
        handleClose,
        subjectData,
        loading,
        topicData,
        questionTypeData,
        handleSubmit,
        handleUpdate,
        table,
        answerKeyData
    } = useAddSubjectiveQuestions()
    
    return (
        <AddSubjectiveQuestionsContainer>
            <AddSubjectiveQuestionsHeaderContainer>
                <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
            </AddSubjectiveQuestionsHeaderContainer>
            <AddSubjectiveQuestionsBodyContainer>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        subjectId: editData ? editData?.subjectId :'',
                        questionTypeId: editData ? editData?.questionTypeId : '',
                        topicId: editData ? editData?.topicId : '',
                        mark: editData ? editData?.mark : '',
                        question: editData ? editData?.question : ''
                    }}
                    onSubmit={(values) => {
                        if (editData) {
                            handleUpdate({...editData, ...values, question: removeHtmlTags(values?.question), mark: Number(values?.mark)})
                        } else {
                            handleSubmit({...values, question: removeHtmlTags(values?.question), mark: Number(values?.mark), answerKeyData: answerKeyData})
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
                            <SubjectTopicTypeContainer>
                                <AppDropDown
                                    data={subjectData} 
                                    placeHolder={'Please select'} 
                                    handleChange={(e) => {
                                        handleChange(e);
                                    }} 
                                    value={values?.subjectId}
                                    name={'subjectId'}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    label={'Subject'}
                                    minWidth={'300px'}
                                    isRequired
                                />

                                <AppDropDown
                                    data={topicData} 
                                    placeHolder={'Please select'} 
                                    handleChange={(e) => {
                                        handleChange(e);
                                    }} 
                                    value={values?.topicId}
                                    name={'topicId'}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    label={'Topic'}
                                    minWidth={'300px'}
                                    isRequired
                                />

                                <AppDropDown
                                    data={questionTypeData?.filter((item) => item?.name === 'SUBJECTIVE')} 
                                    placeHolder={'Please select'} 
                                    handleChange={(e) => {
                                        handleChange(e);
                                    }} 
                                    value={values?.questionTypeId}
                                    name={'questionTypeId'}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                    label={'Question Type'}
                                    minWidth={'300px'}
                                    isRequired
                                />
                            </SubjectTopicTypeContainer>
                            <TextEditor 
                                handleChange={(e) => handleChange(e)} 
                                value={values?.question} 
                                name='question'
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                label={'Question'}
                                isRequired
                            />
                            <AppInput
                                label='Question Marks' 
                                name='mark' 
                                type='number' 
                                handleChange={(e) => handleChange(e)} 
                                value={String(values?.mark)} 
                                placeholder={'Enter question mark'} 
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                isRequired
                            />

                            <MaterialReactTable table={table} />

                            <ButtonContainer>
                                <Button onClick={() => handleClose()} variant="contained" color={'error'} disabled={false}>Cancel</Button>
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button variant="contained" type='submit' color={'success'} disabled={loading}>Submit</Button>
                                    {loading && (
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
            </AddSubjectiveQuestionsBodyContainer>
        </AddSubjectiveQuestionsContainer>
    )   
}

export default AddSubjectiveQuestions