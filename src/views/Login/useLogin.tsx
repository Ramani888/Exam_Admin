import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { serverAdminLogin } from '../../services/serverApi';

const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null)
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field.*").email(),
    password: Yup.string()
      .required("Password is a required field.*")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      // )
  });

  const handleSubmit = async (data: {email: string, password: string}) => {
    try {
      const res = await serverAdminLogin(data);
      if (res?.success) {
        setError(null)
        localStorage.setItem('Admin', JSON.stringify(res.admin));
        navigate('/')
      }
    } catch (err: any) {
      setError(err?.response?.data?.error)
      console.log(err)
    }
  }

  return {
    schema,
    handleSubmit,
    error
  }
}

export default useLogin