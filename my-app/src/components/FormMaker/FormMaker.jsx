/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Grid, Card, InputLabel, TextField, FormHelperText, Select, MenuItem,
  Checkbox, Typography, FormControlLabel, FormControl, CardContent,
  Alert, Button,
} from '@mui/material'
import { Formik, Form, useField } from 'formik'
import './form.css'
import LoadingButton from '@mui/lab/LoadingButton'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { colorSecondary, colorTertiary } from '../../utils/colors'

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props)
  return (
    <div className="textinputcontainer">
      <Grid
        container
        direction="column"
      >
        <Grid
          container
          direction="row"
        >
          <TextField
            className="textinput"
            error={meta.touched && meta.error ? true : undefined}
            label={label}
            variant="outlined"
            {...field}
            {...props}
          />
        </Grid>
      </Grid>

      {meta.touched && meta.error ? (
        <FormHelperText error={meta.touched && meta.error ? true : undefined} id="component-error-text">{meta.error}</FormHelperText>
      ) : null}
    </div>
  )
}

function MyCheckbox({ label, ...props }) {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div className="textinputcontainer">
      <FormControlLabel
        control={
          <Checkbox {...field} {...props} />
            }
        label={label}
      />
      {meta.touched && meta.error ? (
        <FormHelperText error={meta.touched && meta.error ? true : undefined} id="component-error-text">{meta.error}</FormHelperText>
      ) : null}
    </div>
  )
}

function MySelect({ label, options, ...props }) {
  const [field, meta] = useField(props)
  return (
    <div className="textinputcontainer">
      <FormControl>
        <InputLabel id={props.name}>{label}</InputLabel>
        <Select
          labelId={props.name}
          error={meta.touched && meta.error ? true : undefined}
          {...field}
          className="textinput"
          label={label}
        >
          {options.map((item) => (
            <MenuItem value={item.value} key={item.value}>{item.text}</MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error ? (
          <FormHelperText
            error={meta.touched && meta.error ? true : undefined}
          >
            {meta.error}
          </FormHelperText>
        ) : null}
      </FormControl>
    </div>
  )
}

MySelect.propTypes = {
  label: PropTypes.string.isRequired,
}

MyCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
}

MyTextInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default function FormMaker({
  formTitle, initialFormValues, validationSchema, inputTextFields, selectFields,
  checkboxFields, handleSubmit, navigateTo, successMessage, showSignUp,
}) {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [showErrorAlert, setShowErrorAlert] = React.useState(false)
  const [showErrorAlertMessage, setShowErrorAlertMessage] = React.useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false)
  const [showSuccessAlertMessage, setShowSuccessAlertMessage] = React.useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showSuccessAlert) navigate(navigateTo)
    }, 1000)
    return () => clearTimeout(timer)
  }, [showSuccessAlert])
  useEffect(() => {
    setShowSuccessAlertMessage(successMessage)
    setLoading(false)
    setShowErrorAlert(false)
    setShowSuccessAlert(false)
  }, [])
  const submitting = async (values) => {
    handleSubmit(values).then((res) => {
      if (!res.isSuccess) {
        setShowErrorAlert(true)
        setShowErrorAlertMessage(res.response.response.data)
        if (res) setLoading(false)
      } else {
        setShowErrorAlert(false)
        setShowSuccessAlert(true)
        if (res?.response?.data?.userToken) {
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(res.response.data))
        }
      }
    }).catch((error) => {
      if (error) setLoading(false)
    })
  }
  const handleOnChange = async () => {
    setShowErrorAlert(false)
  }
  return (
    <Card className="formcard" variant="outlined" style={{ backgroundColor: colorSecondary }}>
      <CardContent>
        <div className="textinputcontainer">
          <Typography variant="h3" gutterBottom>
            {formTitle}
          </Typography>
        </div>
        {showErrorAlert
          && <Alert severity="error">{showErrorAlertMessage}</Alert>}
        {showSuccessAlert
          && <Alert severity="success">{showSuccessAlertMessage}</Alert>}
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setLoading(true)
            submitting(values)
          }}
        >
          <Form>
            <Grid
              container
              direction="column"
              onChange={() => handleOnChange()}
            >
              {inputTextFields && (
                <>
                  {inputTextFields.map((item) => (
                    <Grid
                      container
                      direction="row"
                      key={item.name}
                    >
                      <MyTextInput
                        label={item.label}
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                      />
                    </Grid>
                  ))}
                </>
              )}
              {selectFields && (
                <>
                  {selectFields.map((item) => (
                    <Grid
                      container
                      direction="row"
                      key={item.name}
                    >
                      <MySelect label={item.label} name={item.name} options={item.options} />
                    </Grid>
                  ))}
                </>
              )}
              {checkboxFields && (
                <>
                  {checkboxFields.map((item) => (
                    <Grid
                      container
                      direction="row"
                      key={item.name}
                    >
                      <MyCheckbox name={item.name} label={item.label} />
                    </Grid>
                  ))}
                </>
              )}
              <Grid
                container
                direction="row"
              >
                <div className="textinputcontainer">
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    startIcon={<KeyboardDoubleArrowRightIcon />}
                    style={{ backgroundColor: colorTertiary, color: 'white' }}
                  >
                    Submit
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        {showSignUp
          && (
          <div className="link">
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
          )}
      </CardContent>
    </Card>
  )
}

FormMaker.propTypes = {
  formTitle: PropTypes.string.isRequired,
  initialFormValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
}
