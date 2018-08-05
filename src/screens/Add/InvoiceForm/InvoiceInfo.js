// @flow
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Grid, TextField, Popper, ClickAwayListener, Paper, List, ListItem, ListItemText, Chip } from '@material-ui/core'
import InvoiceType from '../../../types/InvoiceFormType'

type PersonType = {
    id: string,
    name: string
}

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function,
    setFieldValue: Function
}

type State = {
    helperSuggestions: Array<PersonType>,
    employerSuggestions: Array<PersonType>,
    helper: ?PersonType,
    employer: ?PersonType,
    helperSearch: string,
    employerSearch: string,
    helperAnchor: ?HTMLElement,
    employerAnchor: ?HTMLElement
}

export default class InvoiceInfoForm extends React.Component<FormProps, State> {
    styles = {
        popover: {
            height: 300,
        },
        chip: {
            marginTop: 10
        }
    }

    state = {
        helperSuggestions: [],
        employerSuggestions: [],
        helper: null,
        employer: null,
        helperSearch: "",
        employerSearch: "",
        helperAnchor: null,
        employerAnchor: null
    }
    
    fetchSuggestions = async (collection: string) => {
        const data = []
        const snapshot = await firebase.firestore().collection(collection).get()
        snapshot.forEach(helper => {
            data.push({ id: helper.id, name: helper.data().name })
        })
        this.setState(state => {
            if (collection === "employer_index") state.employerSuggestions = data
            if (collection === "helper_index") state.helperSuggestions = data
            return state
        })
    }

    componentDidMount() {
        this.fetchSuggestions("helper_index")
        this.fetchSuggestions("employer_index")
    }

    changeHelperSearch = (value: string, target: any) => {
        this.setState(state => {
            state.helperSearch = value
            state.helperAnchor = target
            return state
        })
    }

    changeEmployerSearch = (value: string, target: any) => {
        this.setState(state => {
            state.employerSearch = value
            state.employerAnchor = target
            return state
        })
    }

    setHelper = (helper: PersonType) => {
        this.setState(state => {
            state.helper = helper
            return state
        })
        this.props.setFieldValue("helper", helper)
    }

    setEmployer = (employer: PersonType) => {
        this.setState(state => {
            state.employer = employer
            return state
        })
        this.props.setFieldValue("employer", employer)
    }

    closeHelperPopper = () => {
        this.setState(state => {
            state.helperAnchor = null
            return state
        })
    }

    closeEmployerPopper = () => {
        this.setState(state => {
            state.employerAnchor = null
            return state
        })
    }

    removeSelectedHelper = () => {
        this.setState(state => {
            state.helper = null
            return state
        })
        this.props.setFieldValue("helper", {})
    }

    removeSelectedEmployer = () => {
        this.setState(state => {
            state.employer = null
            return state
        })
        this.props.setFieldValue("employer", {})
    }

    filteredHelperSuggestions = (): Array<PersonType> => {
        return this.state.helperSuggestions.filter(helper => {
            return helper.name.indexOf(this.state.helperSearch) > -1
        })
    }

    filteredEmployerSuggestions = (): Array<PersonType> => {
        return this.state.employerSuggestions.filter(employer => {
            return employer.name.indexOf(this.state.employerSearch) > -1
        })
    }

    createHelper = async () => {
        const newHelper = await firebase.firestore().collection("helper").add({
            name: this.state.helperSearch,
            op: "", nationality: "", age: "", refer: "", email: "", phone: ""
        })
        this.setState(state => {
            state.helper = { id: newHelper.id, name: this.state.helperSearch }
            return state
        })
        this.props.setFieldValue("helper", { id: newHelper.id, name: this.state.helperSearch })
    }

    createEmployer = async () => {
        const newEmployer = await firebase.firestore().collection("employer").add({
            name: this.state.employerSearch,
            contacts: [], district: "", hkid: "", nickname: "", refer: ""
        })
        this.setState(state => {
            state.employer = { id: newEmployer.id, name: this.state.employerSearch }
            return state
        })
        this.props.setFieldValue("employer", { id: newEmployer.id, name: this.state.employerSearch })
    }

    render() {
        const { values, isSubmitting, handleChange } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item md={6}>
                    <TextField fullWidth label="Invoice No."
                        value={values.invoice_no} name="invoice_no" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item md={6}>
                    <TextField fullWidth label="Invoice Type"
                        value={values.type} name="type" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth label="Employment Contract No."
                        value={values.employment_contract_no} name="employment_contract_no" onChange={handleChange} disabled={isSubmitting} />
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField label="Search helper by name" fullWidth
                        value={this.state.helperSearch} onChange={(event) => this.changeHelperSearch(event.target.value, event.currentTarget)} disabled={this.state.helper ? true : false}/>
                    { this.state.helper && <Chip style={this.styles.chip} label={this.state.helper.name} onClick={this.removeSelectedHelper} /> }
                    <Popper
                        open={Boolean(this.state.helperAnchor && this.state.helperSuggestions.length >= 0 && !this.state.helper && this.state.helperSearch !== '')}
                        anchorEl={this.state.helperAnchor} style={this.styles.popover}>
                        <ClickAwayListener onClickAway={this.closeHelperPopper}>
                            <Paper>
                                <List>
                                    <ListItem onClick={this.createHelper}>
                                        <ListItemText>Create New helper</ListItemText>
                                    </ListItem>
                                    { this.filteredHelperSuggestions().map((helper, i) => (
                                        <ListItem key={i}>
                                            <ListItemText onClick={() => this.setHelper(helper)}>{ helper.name }</ListItemText>
                                        </ListItem>
                                    )) }
                                </List>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </Grid>

                <Grid item xs={6} md={6}>
                    <TextField label="Search employer by name" fullWidth
                        value={this.state.employerSearch} onChange={(event) => this.changeEmployerSearch(event.target.value, event.currentTarget)} disabled={this.state.employer ? true : false}/>
                    { this.state.employer && <Chip style={this.styles.chip} label={this.state.employer.name} onClick={this.removeSelectedEmployer} /> }
                    <Popper
                        open={Boolean(this.state.employerAnchor && this.state.employerSuggestions.length >= 0 && !this.state.employer && this.state.employerSearch !== '')}
                        anchorEl={this.state.employerAnchor} style={this.styles.popover}>
                        <ClickAwayListener onClickAway={this.closeEmployerPopper}>
                            <Paper>
                                <List>
                                    <ListItem onClick={this.createEmployer}>
                                        <ListItemText>Create New Employer</ListItemText>
                                    </ListItem>
                                    { this.filteredEmployerSuggestions().map((employer, i) => (
                                        <ListItem key={i} onClick={() => this.setEmployer(employer)}>
                                            <ListItemText>{ employer.name }</ListItemText>
                                        </ListItem>
                                    )) }
                                </List>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </Grid>

            </Grid>
        )
    }
}