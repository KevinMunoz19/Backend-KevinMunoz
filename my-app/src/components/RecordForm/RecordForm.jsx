import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { createRecordUrl } from '../../utils/constants'
import FormMaker from '../FormMaker/FormMaker'
import authHeader from '../../services/auth-header'

function RecordForm(acc) {
  const { accountsArray } = acc
  const accountNumbers = accountsArray.map((accountObject) => accountObject.accountNumber)
  const accountNumbersOptions = accountsArray.map((accountObject) => ({
    value: accountObject.accountNumber,
    text: accountObject.accountNumber,
  }))
  const initialFormValues = {
    recordAccountId: '',
    recordComments: '',
    recordAmount: 0.00,
    recordCategory: '',
    recordIsExpense: '',
  }
  const validationSchema = Yup.object({
    recordAccountId: Yup.string()
      .oneOf(
        accountNumbers,
        'Invalid Account number',
      )
      .required('Required'),
    recordComments: Yup.string()
      .max(80, 'Must be 15 characters or less')
      .required('Required'),
    recordAmount: Yup.number()
      .min(0.1)
      .required('Required'),
    recordCategory: Yup.string()
      .oneOf(
        ['Groceries', 'Income', 'Outcome'],
        'Invalid Category',
      ),
    recordIsExpense: Yup.string()
      .oneOf(
        ['Expense', 'Income'],
        'Invalid',
      )
      .required('Required'),
  })
  const inputTextFields = [
    {
      label: 'Comments',
      name: 'recordComments',
      type: 'text',
      placeholder: 'Add Comments',
    },
    {
      label: 'Amount',
      name: 'recordAmount',
      type: 'number',
      placeholder: '0.01',
    },
  ]

  const selectFields = [
    {
      label: 'Account ID',
      name: 'recordAccountId',
      options: accountNumbersOptions,
    },
    {
      label: 'Category',
      name: 'recordCategory',
      options: [
        {
          value: 'Groceries',
          text: 'Groceries',
        },
        {
          value: 'Income',
          text: 'Income',
        },
        {
          value: 'Outcome',
          text: 'Outcome',
        },
      ],
    },
    {
      label: 'Type of Record',
      name: 'recordIsExpense',
      options: [
        {
          value: 'Expense',
          text: 'Expense',
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
        recordAccountId, recordComments, recordAmount, recordCategory, recordIsExpense,
      } = values

      const recordIsExpenseValue = recordIsExpense === 'Expense'

      const createRecordBody = {
        recordAccountId,
        recordComments,
        recordAmount: +recordAmount,
        recordCategory,
        recordIsExpense: recordIsExpenseValue,
      }
      const resp = await axios.post(createRecordUrl, createRecordBody, { headers: authHeader() })
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
      formTitle="Report expense/income"
      initialFormValues={initialFormValues}
      validationSchema={validationSchema}
      inputTextFields={inputTextFields}
      selectFields={selectFields}
      handleSubmit={handleSubmit}
      navigateTo="/"
      successMessage="Record registered successfully"
    />
  )
}

export default RecordForm
