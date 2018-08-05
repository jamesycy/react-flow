// @flow
import React from 'react'
import { Paper, Grid, TextField, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core'
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
        const snapshot = await this.invoiceIndexRef.get()
        return snapshot.docs.filter(item => {
            const invoice: InvoiceType = item.data()
            if(invoice.invoice_no.indexOf(search) > -1 || invoice.helper.name.indexOf(search) > -1 || invoice.employer.name.indexOf(search) > -1) {
                return invoice
            }
        })
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
        console.log(this.state.results)
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
                                    <List>
                                        <ListSubheader>Results in "Invoices"</ListSubheader>
                                        { this.state.results.invoice.map((result, i) => (
                                            <ListItem key={i} onClick={() => this.showDialog("invoice", result.id)}>
                                                <Avatar>
                                                    <Receipt/>
                                                </Avatar>
                                                <ListItemText primary={result.data().invoice_no} secondary={`${result.data().helper.name} - ${result.data().employer.name}`} />
                                            </ListItem>
                                        )) }
                                    </List>
                                }

                                { this.state.results && this.state.results.employer && 
                                    <List>
                                        <ListSubheader>Results in "Employer"</ListSubheader>
                                        { this.state.results.employer.map((result, i) => (
                                            <ListItem key={i} onClick={() => this.showDialog("employer", result.id)}>
                                                <Avatar>
                                                    <Face/>
                                                </Avatar>
                                                <ListItemText primary={result.data().name} secondary={result.data().nickname || "-" } />
                                            </ListItem>
                                        ))}
                                    </List>
                                }

                                { this.state.results && this.state.results.helper && 
                                    <List>
                                        <ListSubheader>Results in "Helper"</ListSubheader>
                                        { this.state.results.helper.map((result, i) => (
                                            <ListItem key={i} onClick={() => this.showDialog("helper", result.id)}>
                                                <Avatar>
                                                    <PersonPin/>
                                                </Avatar>
                                                <ListItemText primary={result.data().name} secondary={result.data().op || "-"} />
                                            </ListItem>
                                        ))}
                                    </List>
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