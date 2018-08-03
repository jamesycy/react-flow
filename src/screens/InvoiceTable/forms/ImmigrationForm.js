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

export default class ImmigrationForm extends React.Component<FormProps> {
    render() {
        const { values, handleChange, isSubmitting, handleSubmit } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <TextField label="Entry Date" fullWidth type="date"
                        value={values.immigration.entry} name="immigration.entry" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Visa Aquire Date" fullWidth type="date"
                        value={values.immigration.visa_aquire} name="immigration.visa_aquire" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Visa Expire Date" fullWidth type="date"
                        value={values.immigration.visa_expire} name="immigration.visa_expire" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth select label="Visa Incomplete"
                        value={values.immigration.visa_incomplete} name="immigration.visa_incomplete" onChange={handleChange} disabled={isSubmitting}>
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
