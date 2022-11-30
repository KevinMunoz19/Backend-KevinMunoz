/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import TransactionContainer from '../TransactionsContainer/TransactionContainer'
import { getAllTransactions, getAllRecords } from '../../utils/apiCalls'
import { colorSecondary } from '../../utils/colors'

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, pb: 5 }}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  }
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
}

export default function TransactionsTabs() {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const [tabs, setTabs] = React.useState([])
  const [recordsIncome, setRecordsIncome] = React.useState([])
  const [recordsExpenses, setRecordsExpenses] = React.useState([])

  useEffect(() => {
    getAllTransactions().then((res) => {
      const mappedTabs = res.data.map((transactionObject) => {
        const {
          accountIdFrom,
          accountNameFrom,
          accountIdTo,
          accountNameTo,
          transactionDate,
          transactionAmount,
          transactionComments,
          transactionNumber,
          transactionType,
        } = transactionObject

        return {
          nameFrom: accountNameFrom,
          idFrom: accountIdFrom,
          nameTo: accountNameTo,
          idTo: accountIdTo,
          date: new Date(transactionDate),
          transactionNumber,
          amount: transactionAmount,
          comment: transactionComments,
          transactionType,
        }
      })
      setTabs(mappedTabs)
    })
    getAllRecords().then((res) => {
      const { data } = res
      const mappedRecords = data.map((recordObject) => {
        const {
          recordAccountId,
          recordAccountName,
          recordAmount,
          recordCategory,
          recordComments,
          recordDate,
          recordIsExpense,
          recordNumber,
        } = recordObject

        return {
          idFrom: recordAccountId,
          nameFrom: recordAccountName,
          date: new Date(recordDate),
          recordNumber,
          amount: recordAmount,
          comment: recordComments,
          recordCategory,
          recordIsExpense,
        }
      })
      setRecordsIncome(mappedRecords?.filter((item) => !item.recordIsExpense))
      setRecordsExpenses(mappedRecords?.filter((item) => item.recordIsExpense))
    })
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  const fabs = [
    {
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Add',
    },
    {
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Expand',
    },
  ]

  return (
    <Box
      sx={{
        bgcolor: colorSecondary,
        width: '90vw',
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
          sx={{
            bgcolor: colorSecondary,
          }}
        >
          <Tab label="Income" {...a11yProps(0)} />
          <Tab label="Expense" {...a11yProps(1)} />
          <Tab label="Transactions" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TransactionContainer tabs={recordsIncome} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TransactionContainer tabs={recordsExpenses} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TransactionContainer tabs={tabs} />
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  )
}
