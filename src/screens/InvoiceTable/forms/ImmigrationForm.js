// @flow
import React from 'react'
import { Grid, TextField, InputLabel, Button, MenuItem, Typography } from '@material-ui/core'
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
                <Grid item xs={12}>
                    <Typography variant="headline">Immigration Info</Typography>
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="entry_date">Entry Date</InputLabel>
                    <TextField fullWidth type="date" id="entry_date"
                        value={values.immigration.entry} name="immigration.entry" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="visa_aquire">Visa Aquire Date</InputLabel>
                    <TextField fullWidth type="date" id="visa_aquire"
                        value={values.immigration.visa_aquire} name="immigration.visa_aquire" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="visa_expire">Visa Expire Date</InputLabel>
                    <TextField fullWidth type="date" id="visa_expire"
                        value={values.immigration.visa_expire} name="immigration.visa_expire" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth select label="Visa Incomplete"
                        value={Boolean(values.immigration.visa_incomplete)} name="immigration.visa_incomplete" onChange={handleChange} disabled={isSubmitting}>
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
