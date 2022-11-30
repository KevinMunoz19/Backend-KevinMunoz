import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage'
import SignUpPage from './pages/SignUpPage'
import History from './pages/History'
import AccountPage from './pages/AccountPage'
import RecordPage from './pages/RecordPage'
import TransactionPage from './pages/TransactionPage'
import AuthVerify from './services/auth.verify'

const logOut = () => {
  localStorage.removeItem('user')
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
      <AuthVerify logOut={logOut} />
    </div>
  )
}

export default App
