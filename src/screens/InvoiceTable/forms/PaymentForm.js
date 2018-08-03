// @flow
import React from 'react'
import moment from 'moment'
import { Grid, TextField, Button } from '@material-ui/core'
import InvoiceType from '../../../types/Invoice'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

export default class PaymentForm extends React.Component<FormProps> {
    render() {
        const { values, handleChange, isSubmitting, handleSubmit } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <TextField label="Pay Date" fullWidth type="date"
                        value={values.payment.pay_date} name="payment.pay_date" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Price" fullWidth
                        value={values.payment.price} name="payment.price" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Sales" fullWidth
                        value={values.payment.sales} name="payment.sales" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
