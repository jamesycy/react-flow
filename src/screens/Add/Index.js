// @flow
import React from 'react'
// Material UI Imports
import { Paper, Grid, FormControl, Select, Input, InputLabel, MenuItem } from '@material-ui/core'

import RemarkForm from './RemarkForm'
import InvoiceForm from './InvoiceForm/Wrapper'

type FormTypeState = {
    formType: string
}

class AddFormSwitcher extends React.Component<any, FormTypeState> {
    state = {
        formType: ""
    }

    styles = {
        container: {
            maxWidth: 1000,
            margin: 'auto',
            padding: 10,
            overflowX: 'scroll'
        },
        formControl: {
            minWidth: 120
        }
    }

    changeFormType = (e: any) => {
        this.setState({ formType: e.target.value })
    }

    render() {
        const { formType } = this.state
        return (
            <Paper style={this.styles.container}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <FormControl style={this.styles.formControl}>
                            <InputLabel htmlFor="formType-picker">Choose One</InputLabel>
                            <Select value={formType} onChange={this.changeFormType}
                            input={<Input name="formType" id="formType-picker" />}>
                                <MenuItem value="Remark">New Remark</MenuItem>
                                <MenuItem value="Invoice">New Invoice</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                { formType === "Remark" && <RemarkForm /> }
                { formType === "Invoice" && <InvoiceForm /> }
            </Paper>
        )
    }
}

export default AddFormSwitcher