import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccounts } from '../utils/apiCalls'
import PageLayout from './PageLayout/PageLayout'
import RecordForm from '../components/RecordForm/RecordForm'
import { getCurrentUser } from '../services/auth.service'
import EmptyDataCard from '../components/EmptyDataCard/EmptyDataCard'

function RecordPage() {
  const navigate = useNavigate()
  const [accountsArray, setAccountsArray] = React.useState([])

  useEffect(() => {
    const userObject = getCurrentUser()
    if (!userObject) {
      navigate('/login')
    } else {
      getAccounts().then((resp) => {
        if (resp.isSuccess) {
          const { accounts } = resp.response.data
          setAccountsArray(accounts)
        }
      })
    }
  }, [])
  if (accountsArray.length > 0) {
    return (
      <PageLayout>
        {accountsArray
          && <RecordForm accountsArray={accountsArray} />}
      </PageLayout>
    )
  }
  return (
    <PageLayout>
      <EmptyDataCard />
    </PageLayout>
  )
}

export default RecordPage
