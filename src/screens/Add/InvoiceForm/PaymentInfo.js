// @flow
import React from 'react'
import InvoiceType from '../../../types/InvoiceFormType'
import { Grid, TextField, InputLabel } from '@material-ui/core'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function
}

export default class PaymentInfoForm extends React.Component<FormProps> {
    render() {
        const { values, isSubmitting, handleChange } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item md={6}>
                    <InputLabel htmlFor="pay_date">Pay Date</InputLabel>
                    <TextField fullWidth id="pay_date" type="date" name="payment.pay_date" disabled={isSubmitting}
                        value={values.payment.pay_date} onChange={handleChange} />
                </Grid>

                <Grid item md={6}>
                    <TextField fullWidth name="payment.price" disabled={isSubmitting} label="Price"
                        value={values.payment.price} onChange={handleChange} />
                </Grid>

                <Grid item md={12}>
                    <TextField fullWidth name="payment.sales" disabled={isSubmitting} label="Sales"
                        value={values.payment.sales} onChange={handleChange} />
                </Grid>
            </Grid>
        )
    }
}