import React, { useEffect } from 'react'
import { withRouter } from './withRouter'

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

function AuthVerify(props) {
  // eslint-disable-next-line react/destructuring-assignment, react/prop-types
  const { location } = props.router

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      const decodedJwt = parseJwt(user.userToken)
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('user')
      }
    }
  }, [location])

  return <div />
}

export default withRouter(AuthVerify)
