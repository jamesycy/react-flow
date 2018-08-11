// @flow
import React from 'react'
import { Grid, TextField, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputLabel } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import InvoiceType from '../../../types/Invoice'
import firebase from 'firebase/app'
import 'firebase/firestore'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

type PromptControl = {
    toggle: boolean
}

export default class InfoForm extends React.Component<FormProps, PromptControl> {
    state = { toggle: false }

    openPrompt = () => {
        this.setState({ toggle: true })
    }
    
    closePrompt = () => {
        this.setState({ toggle: false })
    }

    removeInvoice = async () => {
        await firebase.firestore().collection("invoice").doc(this.props.values.id).delete()
        await firebase.firestore().collection("invoice_index").doc(this.props.values.id).delete()
        this.closePrompt()
    }

    render() {
        const { values, handleChange, isSubmitting, handleSubmit } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={11}>
                    <Typography variant="headline">Invoice Info</Typography>
                </Grid>

                <Grid item xs={1}>
                    <IconButton color="secondary" onClick={this.openPrompt}>
                        <Delete/>
                    </IconButton>
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Invoice No." fullWidth
                        value={values.invoice_no} name="invoice_no" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Invoice Type" fullWidth
                        value={values.type} name="type" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Employment Contract No." fullWidth
                        value={values.employment_contract_no} name="employment_contract_no" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6}>
                    <InputLabel htmlFor="terminate_date">Terminate Date</InputLabel>
                    <TextField fullWidth type="date" id="terminate_date"
                        value={values.terminate_date} name="terminate_date" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>

                <Dialog
                    open={this.state.toggle}
                    onClose={this.closePrompt}>
                    <DialogTitle>Are you sure to delete this invoice?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Click "Yes" if you wish to remove this invoice record
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closePrompt}>No</Button>
                        <Button color="secondary" onClick={this.removeInvoice}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}
