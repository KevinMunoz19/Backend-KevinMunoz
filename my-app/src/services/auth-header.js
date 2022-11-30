export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.userToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.userToken }
  }
  return {}
}
