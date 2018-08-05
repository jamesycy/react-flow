// @flow
import React from 'react'
import InvoiceType from '../../../types/InvoiceFormType'
import { Grid, TextField, InputLabel } from '@material-ui/core'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function
}

export default class ArrivalForm extends React.Component<FormProps> {
    render() {
        const { values, isSubmitting, handleChange } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <InputLabel htmlFor="pickup">Pickup Date</InputLabel>
                    <TextField fullWidth id="pickup" name="arrival.pickup" disabled={isSubmitting} type="date"
                        value={values.arrival.pickup} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="ticket_aboard">Ticket Boarding Date</InputLabel>
                    <TextField fullWidth id="ticket_aboard" name="arrival.ticket_aboard" disabled={isSubmitting} type="date"
                        value={values.arrival.ticket_aboard} onChange={handleChange} />
                </Grid>
            </Grid>
        )
    }
}