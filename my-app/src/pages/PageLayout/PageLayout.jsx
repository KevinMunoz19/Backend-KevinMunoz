/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import './pagelayout.css'
import Header from '../../components/Header/Header'

function PageLayout({ children }) {
  const bodyProps = {}
  bodyProps.justifyContent = 'center'
  bodyProps.alignItems = 'center'
  return (
    <Grid
      container
      direction="column"
    >
      <Grid
        container
        direction="row"
        className="header"
      >
        <Header />
      </Grid>
      <Grid
        container
        direction="row"
        className="body"
        style={{ backgroundColor: '#ffffff' }}
        {...bodyProps}
      >
        {children}
      </Grid>
      <Grid
        container
        direction="row"
        className="footer"
      >
        <h2>footer</h2>
      </Grid>
    </Grid>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
