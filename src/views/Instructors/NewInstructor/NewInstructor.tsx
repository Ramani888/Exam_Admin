import React, { useState } from 'react'
import { ButtonContainer, Form, NewInstructorBodyContainer, NewInstructorBodyRow, NewInstructorContainer, NewInstructorHeaderContainer, PermissionGroup, PermissionGroupContainer, PermissionLabel } from './NewInstructor.styled'
import AddHeader from '../../../components/AddHeader/AddHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import useNewInstructor from './useNewInstructor';
import AppInput from '../../../components/AppInput/AppInput';
import {
  Button, Box, CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
const NewInstructor = () => {
  const location = useLocation();
  const editData = location.state;
  const { schema, handleClose, handleCheckboxChange, handleNavigate, permissions, handleSubmit, handleUpdate, loading } = useNewInstructor(editData);

  return (
    <NewInstructorContainer>
      <NewInstructorHeaderContainer>
        <AddHeader title='Back' handleNavigate={() => handleNavigate()} />
      </NewInstructorHeaderContainer>
      <NewInstructorBodyContainer>
        <Formik
          validationSchema={schema}
          initialValues={{
            firstName: editData ? editData?.firstName : '',
            lastName: editData ? editData?.lastName : '',
            email: editData ? editData?.email : '',
            number: editData ? editData?.number : '',
            password: editData ? editData?.password : '',
          }}
          onSubmit={(values) => {
            if (editData) {
              handleUpdate({ ...values, _id: editData?._id });
            } else {
              handleSubmit({ ...values});
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
              <NewInstructorBodyRow>
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
              </NewInstructorBodyRow>
              <NewInstructorBodyRow>
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
                />
                <AppInput
                  label='Password'
                  name='password'
                  type='password'
                  handleChange={(e) => handleChange(e)}
                  value={values?.password}
                  placeholder={'Password'}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </NewInstructorBodyRow>
              <PermissionLabel>Permission Manager</PermissionLabel>
              <PermissionGroupContainer>
                {permissions?.map((group, index) => (
                  <PermissionGroup key={group.group}>
                    <div>{group.group}</div>
                    {Object.keys(group.permissions).map((perm) => (
                      <label key={perm}>
                        <input
                          type="checkbox"
                          checked={group.permissions[perm as keyof typeof group.permissions]}
                          onChange={() => handleCheckboxChange(index, perm as keyof typeof group.permissions)}
                        />
                        {perm.charAt(0).toUpperCase() + perm.slice(1)}
                      </label>
                    ))}
                  </PermissionGroup>
                ))}
              </PermissionGroupContainer>

              <ButtonContainer>
                <Button onClick={() => handleClose()} variant="contained" color={'error'}>Cancel</Button>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <LoadingButton
                    loading={loading}
                    loadingPosition='center'
                    variant='contained'
                    color={'success'}
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
      </NewInstructorBodyContainer>
    </NewInstructorContainer>
  )
}

export default NewInstructor