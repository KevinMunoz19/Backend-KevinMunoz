import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { signUpUrl } from '../../utils/constants'
import FormMaker from '../FormMaker/FormMaker'

function SignUpForm() {
  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    acceptedTerms: false,
  }

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    acceptedTerms: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions.'),
    password: Yup.string()
      .required('Required')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })

  const inputTextFields = [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      placeholder: 'Jane',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Doe',
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'password',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: 'confirm password',
    },
    {
      label: 'Confirm password',
      name: 'passwordConfirmation',
      type: 'password',
      placeholder: 'jane@formik.com',
    },
  ]

  const checkboxFields = [
    {
      label: 'I accept the terms and conditions',
      name: 'acceptedTerms',
    },
  ]

  const handleSubmit = async (values) => {
    try {
      const {
        firstName, lastName, email, password,
      } = values
      const signUpBody = {
        firstName,
        lastName,
        userEmail: email,
        userPassword: password,
      }
      const resp = await axios.post(signUpUrl, signUpBody)
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
      formTitle="Sign Up"
      initialFormValues={initialFormValues}
      validationSchema={validationSchema}
      inputTextFields={inputTextFields}
      checkboxFields={checkboxFields}
      handleSubmit={handleSubmit}
      navigateTo="/login"
      successMessage="User registered successfully"
    />
  )
}

export default SignUpForm
