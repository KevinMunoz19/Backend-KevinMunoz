/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid } from '@mui/material'

function RecordCard({ data }) {
  const {
    idFrom,
    date,
    recordNumber,
    amount,
    comment,
    recordCategory,
    nameFrom,
  } = data
  return (
    <Grid
      container
      direction="column"
      sx={{
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Paper elevation={5}>
        <Grid
          container
          direction="row"
          sx={{
            padding: '1rem',
          }}
        >
          <Grid
            item
            xs={5}
            alignContent="center"
            justifyContent="center"
            sx={{
              bgcolor: 'white',
              padding: '1rem',
            }}
          >
            <Grid
              item
              xs={12}
            >
              {`From: ${nameFrom}`}
            </Grid>
            <Grid
              item
              xs={12}
            >
              {idFrom}
            </Grid>
            <Grid
              item
              xs={12}
            >
              {recordNumber}
            </Grid>
            <Grid
              item
              xs={12}
            >
              {recordCategory}
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{
              bgcolor: 'white',
              padding: '1rem',
            }}
          >
            <Grid
              item
              xs={12}
            >
              {comment}
            </Grid>
            <Grid
              item
              xs={12}
            >
              {date.toString()}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              bgcolor: 'white',
            }}
          >
            {amount}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

RecordCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default RecordCard
