// @flow
import React from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import InvoiceType from '../../../types/Invoice'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

export default class InfoForm extends React.Component<FormProps> {
    render() {
        const { values, handleChange, isSubmitting, handleSubmit } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="headline">Invoice Info</Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Invoice No." fullWidth
                        value={values.invoice_no} name="invoice_no" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Invoice Type" fullWidth
                        value={values.type} name="type" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Employment Contract No." fullWidth
                        value={values.employment_contract_no} name="employment_contract_no" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
