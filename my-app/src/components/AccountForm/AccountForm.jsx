import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { createAccountUrl } from '../../utils/constants'
import FormMaker from '../FormMaker/FormMaker'
import authHeader from '../../services/auth-header'

function AccountForm() {
  const initialFormValues = {
    accountName: '',
    initialBalance: 0.00,
    accountCurrency: '',
  }
  const validationSchema = Yup.object({
    accountName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    initialBalance: Yup.number()
      .min(0.1)
      .required('Required'),
    accountCurrency: Yup.string()
      .oneOf(
        ['dollars', 'quetzales', 'euros'],
        'Invalid currency',
      )
      .required('Required'),
  })
  const inputTextFields = [
    {
      label: 'Account name',
      name: 'accountName',
      type: 'text',
      placeholder: 'Savings',
    },
    {
      label: 'Initial Balance',
      name: 'initialBalance',
      type: 'number',
      placeholder: '0.01',
    },
  ]

  const selectFields = [
    {
      label: 'Currency',
      name: 'accountCurrency',
      options: [
        {
          value: 'dollars',
          text: 'dollars',
        },
        {
          value: 'quetzales',
          text: 'quetzales',
        },
        {
          value: 'euros',
          text: 'euros',
        },
      ],
    },
  ]

  const handleSubmit = async (values) => {
    try {
      const {
        accountName, initialBalance, accountCurrency,
      } = values
      const createAccountBody = {
        accountCurrency,
        accountName,
        accountBalance: +initialBalance,
      }
      const resp = await axios.post(createAccountUrl, createAccountBody, { headers: authHeader() })
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
      formTitle="Create Account"
      initialFormValues={initialFormValues}
      validationSchema={validationSchema}
      inputTextFields={inputTextFields}
      selectFields={selectFields}
      handleSubmit={handleSubmit}
      navigateTo="/"
      successMessage="Account addedd succesfully"
    />
  )
}

export default AccountForm
