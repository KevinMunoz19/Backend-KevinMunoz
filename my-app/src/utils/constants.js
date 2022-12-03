export const apiBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL+'/api'
export const apiTransactionsUrl = '/transactions'
export const apiAccountsUrl = '/accounts'
export const apiUsersUrl = '/users'
export const apiRecordsUrl = '/records'
export const apiCreateUrl = '/create'
export const apiGetAllUrl = '/getAll'
export const apiLoginUrl = '/login'
export const apiSignUpUrl = '/signup'

export const createAccountUrl = apiBaseUrl + apiAccountsUrl + apiCreateUrl
export const getAccountUrl = apiBaseUrl + apiAccountsUrl + apiGetAllUrl
export const loginUrl = apiBaseUrl + apiUsersUrl + apiLoginUrl
export const signUpUrl = apiBaseUrl + apiUsersUrl + apiSignUpUrl
export const createRecordUrl = apiBaseUrl + apiRecordsUrl + apiCreateUrl
export const getRecordUrl = apiBaseUrl + apiRecordsUrl + apiGetAllUrl
export const createTransactionUrl = apiBaseUrl + apiTransactionsUrl + apiCreateUrl
export const getTransactionsUrl = apiBaseUrl + apiTransactionsUrl + apiGetAllUrl
