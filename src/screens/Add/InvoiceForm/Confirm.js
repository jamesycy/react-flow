// @flow
import React from 'react'
import InvoiceType from '../../../types/InvoiceFormType'
import { Grid, Typography } from '@material-ui/core'

type FormProps = {
    values: InvoiceType
}

export default class ConfirmationForm extends React.Component<FormProps> {
    render() {
        return (
            <Grid container spacing={16}>
                <Typography variant="headline">Confirm ?</Typography>
            </Grid>
        )
    }
}