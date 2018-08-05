// @flow
import React from 'react'
import InvoiceType from '../../../types/InvoiceFormType'
import { Grid, TextField, InputLabel, MenuItem } from '@material-ui/core'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function
}

export default class ImmigrationInfoForm extends React.Component<FormProps> {
    render() {
        const { isSubmitting, values, handleChange } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item md={12}>
                    <InputLabel htmlFor="entry">Entry Date</InputLabel>
                    <TextField fullWidth type="date" id="entry" name="immigration.entry" disabled={isSubmitting}
                        value={values.immigration.entry} onChange={handleChange} />
                </Grid>

                <Grid item md={6}>
                    <InputLabel htmlFor="visa_aquire">Visa Aquire Date</InputLabel>
                    <TextField fullWidth type="date" id="visa_aquire" name="immigration.visa_aquire" disabled={isSubmitting}
                        value={values.immigration.visa_aquire} onChange={handleChange} />
                </Grid>

                <Grid item md={6}>
                    <InputLabel htmlFor="visa_expire">Visa Expire Date</InputLabel>
                    <TextField fullWidth type="date" id="visa_expire" name="immigration.visa_expire" disabled={isSubmitting}
                        value={values.immigration.visa_expire} onChange={handleChange} />
                </Grid>

                <Grid item md={12}>
                    <TextField label="Visa Incomplete" fullWidth disabled={isSubmitting} select name="immigration.visa_incomplete"
                        value={Boolean(values.immigration.visa_incomplete)} onChange={handleChange}>
                        <MenuItem value={false}>No</MenuItem>
                        <MenuItem value={true}>Yes</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        )
    }
}