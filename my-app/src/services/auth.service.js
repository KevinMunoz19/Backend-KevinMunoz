const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))

export {
  // eslint-disable-next-line import/prefer-default-export
  getCurrentUser,
}
