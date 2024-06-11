import React from 'react'
import { ButtonContainer, Form, NewCandidatesBodyContainer, NewCandidatesBodyRow, NewCandidatesContainer, NewCandidatesHeaderContainer } from './NewCandidates.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import AppDropDown from '../../../components/AppDropDown/AppDropDown';
import useNewCandidates from './useNewCandidates';
import { Formik } from "formik";
import AppInput from '../../../components/AppInput/AppInput';
import {
  Button, Box, CircularProgress
} from '@mui/material';

const NewCandidates = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/candidates/candidate-data');
  }
  const {
    batchData,
    handleClose,
    schema,
    handleSubmit,
    handleUpdate
  } = useNewCandidates();
  const location = useLocation();
  const editData = location.state;
  return (
    <NewCandidatesContainer>
      <NewCandidatesHeaderContainer>
        <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
      </NewCandidatesHeaderContainer>
      <NewCandidatesBodyContainer>
        <Formik
          validationSchema={schema}
          initialValues={{
            batchId: editData ? editData?.batchId : '',
            rollNumber: editData ? editData?.rollNumber : '',
            firstName: editData ? editData?.firstName : '',
            middleName: editData ? editData?.middleName : '',
            lastName: editData ? editData?.lastName : '',
            email: editData ? editData?.email : '',
            number: editData ? editData?.number : '',
          }}
          onSubmit={(values) => {
            if (editData) {
              handleUpdate({...values, _id: editData?._id})
            } else {
              handleSubmit({...values})
              // const questions = examQuestionData.filter(item => item.selected).map(item => ({ questionId: item?._id?.toString() }));
              // handleSubmit({...values, totalMark: totalMark, questions: questions, questionTypeId: selectedQuestionType})
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
          isValid,
          isValidating,
          isSubmitting    
          }) => (
            <Form onSubmit={handleSubmit}>
              <NewCandidatesBodyRow>
                <AppDropDown
                  data={batchData} 
                  placeHolder={'Please select'} 
                  handleChange={(e) => {
                      handleChange(e);
                      // setExamQuestionData([]);
                  }} 
                  value={values?.batchId}
                  name={'batchId'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  label={'Batch'}
                  minWidth={'300px'}
                  isRequired
                />
                <AppInput
                  label='Roll Number' 
                  name='rollNumber' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.rollNumber} 
                  placeholder={'Roll Number'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewCandidatesBodyRow>
              <NewCandidatesBodyRow>
                <AppInput
                  label='First Name' 
                  name='firstName' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.firstName} 
                  placeholder={'First Name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Middle Name' 
                  name='middleName' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.middleName} 
                  placeholder={'Middle Name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Last Name' 
                  name='lastName' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.lastName} 
                  placeholder={'Last Name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewCandidatesBodyRow>
              <NewCandidatesBodyRow>
                <AppInput
                  label='Email' 
                  name='email' 
                  type='email' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.email} 
                  placeholder={'Email ID'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Mobile Number' 
                  name='number' 
                  type='number' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.number} 
                  placeholder={'Mobile No'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewCandidatesBodyRow>

              <ButtonContainer>
                <Button onClick={() => handleClose()} variant="contained" color={'error'}>Cancel</Button>
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
      </NewCandidatesBodyContainer>
    </NewCandidatesContainer>
  )
}

export default NewCandidates