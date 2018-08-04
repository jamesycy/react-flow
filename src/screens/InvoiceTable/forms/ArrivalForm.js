// @flow
import React from 'react'
import { Grid, TextField, InputLabel, Button, Typography } from '@material-ui/core'
import InvoiceType from '../../../types/Invoice'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

export default class ArrivalForm extends React.Component<FormProps> {
    render() {
        const { values, handleChange, isSubmitting, handleSubmit } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="headline">Arrival Info</Typography>
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="pickup_date">Pickup Date</InputLabel>
                    <TextField fullWidth type="date" id="pickup_date"
                        value={values.arrival.pickup} name="arrival.pickup" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="ticket">Ticket Board Date</InputLabel>
                    <TextField fullWidth type="date" id="ticket"
                        value={values.arrival.ticket_aboard} name="arrival.ticket_aboard" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
