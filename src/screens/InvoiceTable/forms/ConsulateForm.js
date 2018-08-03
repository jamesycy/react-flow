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

export default class ConsulateForm extends React.Component<FormProps> {
    render() {
        const { values, handleChange, isSubmitting, handleSubmit } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <TextField label="Entry Date" fullWidth type="date"
                        value={values.consulate.entry} name="consulate.entry" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Exit Date" fullWidth type="date"
                        value={values.consulate.exit} name="consulate.visa_aquire" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
