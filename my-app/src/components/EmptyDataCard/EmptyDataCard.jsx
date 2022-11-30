import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './EmptyDataCard.css'

function EmptyDataCard() {
  return (
    <Card className="emptyDataCard">
      <CardContent>
        <Typography variant="h5" component="div">
          Hi
        </Typography>
        <Typography variant="body2">
          It appears no information is available
        </Typography>
      </CardContent>
    </Card>
  )
}
export default EmptyDataCard
