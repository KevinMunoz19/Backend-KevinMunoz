import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid, InputLabel, Select, MenuItem, FormControl,
} from '@mui/material'
import { colorSecondary } from '../../utils/colors'

function TransactionsFilters({ setFilterCallback }) {
  const [filter, setFilter] = React.useState('')
  const handleChange = (event) => {
    setFilter(event.target.value)
    setFilterCallback(event.target.value)
  }
  return (
    <Grid
      container
      direction="row"
      sx={{
        marginTop: '1rem',
        marginBottom: '1rem',
        paddingLeft: '1rem',
        bgcolor: colorSecondary,
      }}
    >
      <Grid
        container
        direction="column"
        xs={4}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem value={1}>Date</MenuItem>
            <MenuItem value={2}>Category</MenuItem>
            <MenuItem value={3}>Account</MenuItem>
          </Select>
        </FormControl>
      </Grid>

    </Grid>
  )
}

TransactionsFilters.propTypes = {
  setFilterCallback: PropTypes.func.isRequired,
}

export default TransactionsFilters
