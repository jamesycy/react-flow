// @flow
import React from 'react'
import { Paper, Grid, TextField, List, ListItem, ListItemText, ListSubheader, Avatar } from '@material-ui/core'
import { Receipt, Face, PersonPin } from '@material-ui/icons'

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
    results: ?ResultsType
}

export default class SearchIndex extends React.Component<any,State> {
    helperRef: firebase.firestore.CollectionReference = firebase.firestore().collection("helper")
    employerRef: firebase.firestore.CollectionReference = firebase.firestore().collection("employer")
    invoiceRef: firebase.firestore.CollectionReference = firebase.firestore().collection("invoice")
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
        results: null
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
                                            <ListItem key={i}>
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
                                            <ListItem key={i}>
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
                                            <ListItem key={i}>
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
            </React.Fragment>
        )
    }
}