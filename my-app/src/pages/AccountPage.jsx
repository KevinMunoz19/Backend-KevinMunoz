import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from './PageLayout/PageLayout'
import AccountForm from '../components/AccountForm/AccountForm'
import { getCurrentUser } from '../services/auth.service'

function AccountPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const userObject = getCurrentUser()
    if (!userObject) {
      navigate('/login')
    }
  }, [])
  return (
    <PageLayout>
      <AccountForm />
    </PageLayout>
  )
}

export default AccountPage
