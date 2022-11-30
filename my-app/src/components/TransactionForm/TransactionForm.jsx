import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { createTransactionUrl } from '../../utils/constants'
import FormMaker from '../FormMaker/FormMaker'
import authHeader from '../../services/auth-header'

function TransactionForm(acc) {
  const { accountsArray } = acc
  const accountNumbers = accountsArray.map((accountObject) => accountObject.accountNumber)
  const accountNumbersOptions = accountsArray.map((accountObject) => ({
    value: accountObject.accountNumber,
    text: accountObject.accountNumber,
  }))
  const initialFormValues = {
    recordAccountId: '',
    transactionComments: '',
    transactionAmount: 0.00,
    transactionType: '',
    recordIsExpense: '',
    accountIdFrom: '',
    accountIdTo: '',
  }
  const validationSchema = Yup.object({
    accountIdFrom: Yup.string()
      .oneOf(
        accountNumbers,
        'Invalid Account number',
      )
      .required('Required'),
    accountIdTo: Yup.string()
      .max(36, 'Must be 36 characters')
      .required('Required'),
    transactionAmount: Yup.number()
      .min(0.1)
      .required('Required'),
    transactionComments: Yup.string()
      .max(36, 'Must be 20 characters')
      .required('Required'),
    transactionType: Yup.string()
      .oneOf(
        ['Groceries', 'Income'],
        'Invalid',
      )
      .required('Required'),
  })
  const inputTextFields = [
    {
      label: 'Account ID to deposit',
      name: 'accountIdTo',
      type: 'text',
      placeholder: 'Add account number',
    },
    {
      label: 'Comments',
      name: 'transactionComments',
      type: 'text',
      placeholder: 'Add Comments',
    },
    {
      label: 'Amount',
      name: 'transactionAmount',
      type: 'number',
      placeholder: '0.01',
    },
  ]

  const selectFields = [
    {
      label: 'Account ID',
      name: 'accountIdFrom',
      options: accountNumbersOptions,
    },
    {
      label: 'Type of Transaction',
      name: 'transactionType',
      options: [
        {
          value: 'Groceries',
          text: 'Groceries',
        },
        {
          value: 'Income',
          text: 'Income',
        },
      ],
    },
  ]

  const handleSubmit = async (values) => {
    try {
      const {
        accountIdFrom, accountIdTo, transactionAmount, transactionComments, transactionType,
      } = values

      const createTransactionBody = {
        accountIdFrom,
        accountIdTo,
        transactionAmount: +transactionAmount,
        transactionComments,
        transactionType,
      }
      const resp = await axios.post(
        createTransactionUrl,
        createTransactionBody,
        { headers: authHeader() },
      )
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
      formTitle="Create Transaction"
      initialFormValues={initialFormValues}
      validationSchema={validationSchema}
      inputTextFields={inputTextFields}
      selectFields={selectFields}
      handleSubmit={handleSubmit}
      navigateTo="/"
      successMessage="Transaction registered successfully"
    />
  )
}

export default TransactionForm
