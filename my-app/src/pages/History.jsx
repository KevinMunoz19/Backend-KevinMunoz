import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from './PageLayout/PageLayout'
import TransactionTabs from '../components/Transactions/TransactionsTabs'
import { getCurrentUser } from '../services/auth.service'

function History() {
  const navigate = useNavigate()
  useEffect(() => {
    const userObject = getCurrentUser()
    if (!userObject) {
      navigate('/login')
    }
  }, [])
  return (
    <PageLayout>
      <TransactionTabs />
    </PageLayout>
  )
}

export default History
