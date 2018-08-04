// @flow
import React from 'react'
import { Grid, TextField, InputLabel, Button, Typography } from '@material-ui/core'
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
                <Grid item xs={12}>
                    <Typography variant="headline">Consulate Info</Typography>
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="entry_date">Entry Date</InputLabel>
                    <TextField fullWidth type="date" id="entry_date"
                        value={values.consulate.entry} name="consulate.entry" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="exit_date">Exit Date</InputLabel>
                    <TextField fullWidth type="date" id="exit_date"
                        value={values.consulate.exit} name="consulate.visa_aquire" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}
