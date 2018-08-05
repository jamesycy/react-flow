// @flow
import React from 'react'
import InvoiceType from '../../../types/InvoiceFormType'
import { Grid, TextField, InputLabel } from '@material-ui/core'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function
}

export default class ConsulateForm extends React.Component<FormProps> {
    render() {
        const { values, isSubmitting, handleChange } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <InputLabel htmlFor="entry">Entry Date</InputLabel>
                    <TextField fullWidth id="entry" name="consulate.entry" disabled={isSubmitting} type="date"
                        value={values.consulate.entry} onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="entry">Exit Date</InputLabel>
                    <TextField fullWidth id="exit" name="consulate.exit" disabled={isSubmitting} type="date"
                        value={values.consulate.exit} onChange={handleChange} />
                </Grid>
            </Grid>
        )
    }
}