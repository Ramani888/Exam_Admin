import React from 'react'
import { ButtonContainer, Form, NewBatchBodyContainer, NewBatchBodyRow, NewBatchContainer, NewBatchHeaderContainer } from './NewBatch.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik } from "formik";
import AppInput from '../../../components/AppInput/AppInput';
import useNewBatch from './useNewBatch';
import {
  Button, Box, CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MaterialReactTable } from 'material-react-table'

const NewBatch = () => {
  const {
    schema,
    handleClose,
    loading,
    table,
    selectedStudent,
    handleSubmit
  } = useNewBatch()
  const location = useLocation();
  const editData = location.state;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/candidates/batch');
  }
  return (
    <NewBatchContainer>
      <NewBatchHeaderContainer>
        <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
      </NewBatchHeaderContainer>
      <NewBatchBodyContainer>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: editData ? editData?.name : '',
            discription: editData ? editData?.discription : ''
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
          }) => (
            <Form onSubmit={handleSubmit}>
              <NewBatchBodyRow>
                <AppInput
                  label='Batch Name' 
                  name='name' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.name} 
                  placeholder={'Enter batch name'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
                <AppInput
                  label='Batch Discription' 
                  name='discription' 
                  type='text' 
                  handleChange={(e) => handleChange(e)} 
                  value={values?.discription} 
                  placeholder={'Enter discription'} 
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isRequired
                />
              </NewBatchBodyRow>
              <MaterialReactTable table={table} />
              <ButtonContainer>
                <Button onClick={() => handleClose()} variant="contained" color={'error'}>Cancel</Button>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <LoadingButton
                    loading={loading}
                    loadingPosition='center'
                    variant='contained'
                    color={'success'}
                    disabled={loading || selectedStudent?.length === 0 ? true : false}
                    type='submit'
                  >
                    Submit
                  </LoadingButton>
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
      </NewBatchBodyContainer>
    </NewBatchContainer>
  )
}

export default NewBatch