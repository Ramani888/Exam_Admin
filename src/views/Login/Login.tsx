import React from 'react'
import { Form, HeaderLogo, HeaderProjectName, HeaderWelcomeTitle, LoginBodyContainer, LoginContainer, LoginError, LoginHeaderContainer, LoginLeftContainer, LoginRightContainer, LoginWrapper, RightBoxImg } from './Login.styled'
import { Formik } from "formik";
import useLogin from './useLogin';
import AppInput from '../../components/AppInput/AppInput';
import { Button } from '@mui/material';

const LoginView = () => {
    const { schema, handleSubmit, error } = useLogin();
  return (
    <LoginWrapper>
        <LoginContainer>
            <LoginLeftContainer>
                <LoginHeaderContainer>
                    <HeaderLogo></HeaderLogo>
                    <HeaderWelcomeTitle>Welcome To</HeaderWelcomeTitle>
                    <HeaderProjectName>Project Title</HeaderProjectName>
                </LoginHeaderContainer>
                <LoginBodyContainer>
                    <Formik
                        validationSchema={schema}
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values) => {
                            handleSubmit({...values})
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
                            <AppInput
                                label='Email' 
                                name='email' 
                                type='text' 
                                handleChange={(e) => handleChange(e)} 
                                value={String(values?.email)} 
                                placeholder={'email@exmple.com'} 
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                minWidth={'300px'}
                            />
                            <AppInput
                                label='Password' 
                                name='password' 
                                type='password' 
                                handleChange={(e) => handleChange(e)} 
                                value={String(values?.password)} 
                                placeholder={'********'} 
                                handleBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />
                            <Button variant="contained" type='submit' color={'primary'} disabled={false} fullWidth>Login</Button>
                        </Form>
                        )}
                    </Formik>
                    {error && (
                        <LoginError>{error}</LoginError>
                    )}
                </LoginBodyContainer>
            </LoginLeftContainer>
            <LoginRightContainer>
                <RightBoxImg src='/Vineyard.jpg' width={'100%'} height={'100%'}></RightBoxImg>
            </LoginRightContainer>
        </LoginContainer>
    </LoginWrapper>
  )
}

export default LoginView