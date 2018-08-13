// @flow
import React from 'react'
import { Paper, Grid, TextField, ListItemText, ListSubheader, Avatar, MenuList, MenuItem } from '@material-ui/core'
import { Receipt, Face, PersonPin } from '@material-ui/icons'

import InvoiceDialog from './InvoiceDialog'
import HelperDialog from './HelperDialog'
import EmployerDialog from './EmployerDialog'

import InvoiceType from '../../types/InvoiceFormType'

import firebase from 'firebase/app'
import 'firebase/firestore'

type ResultsType = {
    invoice: Array<firebase.firestore.QueryDocumentSnapshot>,
    helper: Array<firebase.firestore.QueryDocumentSnapshot>,
    employer: Array<firebase.firestore.QueryDocumentSnapshot>
}

type State = {
    search: string,
    results: ?ResultsType,
    dialog: string,
    dialog_target: string
}

export default class SearchIndex extends React.Component<any,State> {
    helperIndexRef: firebase.firestore.CollectionReference = firebase.firestore().collection("helper_index")
    employerIndexRef: firebase.firestore.CollectionReference = firebase.firestore().collection("employer_index")
    invoiceIndexRef: firebase.firestore.CollectionReference = firebase.firestore().collection("invoice_index")

    styles = {
        container: {
            marginTop: 5
        },
        spacing: {
            height: 20
        }
    }

    state = {
        search: "",
        results: null,
        dialog: "",
        dialog_target: ""
    }

    changeSearch = (e: any) => {
        const value = e.target.value
        this.setState(state => {
            state.search = value
            return state
        })
    }

    search = async (e: any) => {
        if(e.key === "Enter" && this.state.search !== "") {
            const invoice = await this.getInvoiceResults()
            const employer = await this.getEmployerResults()
            const helper = await this.getHelperResults()
            this.setState(state => {
                state.results = { invoice, employer, helper }
                return state
            })
        }
    }

    getInvoiceResults = async () => {
        const { search } = this.state
        const byInvoiceNo = await this.invoiceIndexRef.where("invoice_no", ">=", search).where("invoice_no", "<=", search+"\uf8ff").limit(15).get()
        const byHelper = await this.invoiceIndexRef.orderBy("helper.name").startAt(search).endAt(search+'\uf8ff').limit(15).get()
        const byEmployer = await this.invoiceIndexRef.orderBy("employer.name").startAt(search).endAt(search+'\uf8ff').limit(15).get()
        return byInvoiceNo.docs.concat(byHelper.docs).concat(byEmployer.docs)
    }

    getEmployerResults = async () => {
        const { search } = this.state
        const snapshot = await this.employerIndexRef.orderBy("name").startAt(search).endAt(search + "\uf8ff").get()
        return snapshot.docs
    }

    getHelperResults = async () => {
        const { search } = this.state
        const snapshot = await this.helperIndexRef.orderBy("name").startAt(search).endAt(search + "\uf8ff").get()
        return snapshot.docs
    }

    showDialog = (type: string, id: string) => {
        this.setState(state => {
            state.dialog = type
            state.dialog_target = id
            return state
        })
    }

    closeDialog = () => {
        this.setState(state => {
            state.dialog = ""
            state.dialog_target = ""
            return state
        })
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={16} style={this.styles.container}>
                    <Grid item xs={12} style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <TextField label="Search" fullWidth onChange={this.changeSearch} onKeyPress={this.search} />
                    </Grid>
                </Grid>

                <div style={this.styles.spacing}></div>

                <Paper>
                    { this.state.results && 
                        <Grid container spacing={16}>
                            <Grid item xs={12}>
                                { this.state.results && this.state.results.invoice && 
                                    <MenuList>
                                        <ListSubheader>Results in "Invoices"</ListSubheader>
                                        { this.state.results.invoice.map((result, i) => (
                                            <MenuItem key={i} onClick={() => this.showDialog("invoice", result.id)}>
                                                <Avatar>
                                                    <Receipt/>
                                                </Avatar>
                                                <ListItemText primary={result.data().invoice_no} secondary={`${result.data().helper.name} - ${result.data().employer.name}`} />
                                            </MenuItem>
                                        )) }
                                    </MenuList>
                                }

                                { this.state.results && this.state.results.employer && 
                                    <MenuList>
                                        <ListSubheader>Results in "Employer"</ListSubheader>
                                        { this.state.results.employer.map((result, i) => (
                                            <MenuItem key={i} onClick={() => this.showDialog("employer", result.id)}>
                                                <Avatar>
                                                    <Face/>
                                                </Avatar>
                                                <ListItemText primary={result.data().name} secondary={result.data().nickname || "-" } />
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                }

                                { this.state.results && this.state.results.helper && 
                                    <MenuList>
                                        <ListSubheader>Results in "Helper"</ListSubheader>
                                        { this.state.results.helper.map((result, i) => (
                                            <MenuItem key={i} onClick={() => this.showDialog("helper", result.id)}>
                                                <Avatar>
                                                    <PersonPin/>
                                                </Avatar>
                                                <ListItemText primary={result.data().name} secondary={result.data().op || "-"} />
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                }
                            </Grid>
                        </Grid>
                    }
                </Paper>

                { this.state.dialog === "invoice" && <InvoiceDialog id={this.state.dialog_target} closeDialog={this.closeDialog} /> }
                { this.state.dialog === "helper" && <HelperDialog id={this.state.dialog_target} closeDialog={this.closeDialog} /> }
                { this.state.dialog === "employer" && <EmployerDialog id={this.state.dialog_target} closeDialog={this.closeDialog} /> }

            </React.Fragment>
        )
    }
}