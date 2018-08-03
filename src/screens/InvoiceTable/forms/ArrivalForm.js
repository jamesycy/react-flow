// @flow
import React from 'react'
import moment from 'moment'
import { Grid, TextField, Button, MenuItem } from '@material-ui/core'
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
                <Grid item xs={6}>
                    <TextField label="Pickup Date" fullWidth type="date"
                        value={values.arrival.pickup} name="arrival.pickup" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Exit Date" fullWidth type="date"
                        value={values.arrival.ticket_aboard} name="arrival.ticket_aboard" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
