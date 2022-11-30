import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { loginUrl } from '../../utils/constants'
import FormMaker from '../FormMaker/FormMaker'

function LoginForm() {
  const initialFormValues = {
    email: '',
    password: '',
  }
  const validationSchema = Yup.object({
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  })
  const inputTextFields = [
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'jane@formik.com',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
    },
  ]

  const handleSubmit = async (values) => {
    try {
      const {
        email, password,
      } = values
      const logInBody = {
        userEmail: email,
        userPassword: password,
      }
      const resp = await axios.post(loginUrl, logInBody)
      const returnObject = {
        isSuccess: true,
        response: resp,
      }
      return returnObject
    } catch (error) {
      const returnObject = {
        isSuccess: false,
        response: error,
      }
      return returnObject
    }
  }

  return (
    <FormMaker
      formTitle="Login"
      initialFormValues={initialFormValues}
      validationSchema={validationSchema}
      inputTextFields={inputTextFields}
      handleSubmit={handleSubmit}
      navigateTo="/"
      successMessage="Login correct"
      showSignUp
    />
  )
}

export default LoginForm
