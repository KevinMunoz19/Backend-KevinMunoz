import axios from 'axios'
import {
  getTransactionsUrl, getAccountUrl, getRecordUrl,
} from './constants'
import authHeader from '../services/auth-header'

const getAllTransactions = async () => axios.get(getTransactionsUrl, { headers: authHeader() })
const getAllRecords = async () => axios.get(getRecordUrl, { headers: authHeader() })
const getAccounts = async () => {
  try {
    const resp = await axios.get(getAccountUrl, { headers: authHeader() })
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

export {
  getAllTransactions,
  getAccounts,
  getAllRecords,
}
