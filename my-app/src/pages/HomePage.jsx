import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from './PageLayout/PageLayout'
import Dashboard from '../components/Dashboard/Dashboard'
import { getCurrentUser } from '../services/auth.service'
import { getAccounts } from '../utils/apiCalls'
import EmptyDataCard from '../components/EmptyDataCard/EmptyDataCard'

function HomePage() {
  const navigate = useNavigate()
  const [accountsArray, setAccountsArray] = React.useState([])
  const [userData, setUserData] = React.useState([])

  useEffect(() => {
    const userObject = getCurrentUser()
    if (!userObject) {
      navigate('/login')
    } else {
      getAccounts().then((resp) => {
        if (resp.isSuccess) {
          const { firstName, lastName, userEmail } = resp.response.data
          const userInfo = [firstName, lastName, userEmail]
          const { accounts } = resp.response.data
          setAccountsArray(accounts)
          setUserData(userInfo)
        }
      })
    }
  }, [])
  if (accountsArray.length > 0 && userData.length > 0) {
    return (
      <PageLayout>
        {accountsArray
          && (
          <Dashboard
            accountsArray={accountsArray}
            userData={userData}
          />
          )}
      </PageLayout>
    )
  }
  return (
    <PageLayout>
      <EmptyDataCard />
    </PageLayout>
  )
}

export default HomePage
