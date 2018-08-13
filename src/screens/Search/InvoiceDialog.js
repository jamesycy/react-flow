// @fow 
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, List, ListItem, ListItemText, ListSubheader, ListItemSecondaryAction, Divider, MenuItem, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

import InvoiceType from '../../types/Invoice'

type DialogState = {
    invoice: InvoiceType,
    remarks: Array<firebase.firestore.QueryDocumentSnapshot>
}

type DialogProps = {
    id: string,
    closeDialog: Function
}

export default class InvoiceDialog extends React.Component<DialogState, DialogProps> {
    invoiceRef: firebase.firestore.CollectionReference = firebase.firestore().collection("invoice")

    state = {
        invoice: null,
        remarks: []
    }

    async componentDidMount() {
        const snapshot = await firebase.firestore().collection("invoice").doc(this.props.id).get()
        const remarkSnapshot = await firebase.firestore().collection("remark").where("invoice_id", "==", this.props.id).get()
        this.setState({ invoice: snapshot.data(), remarks: remarkSnapshot.docs })
    }

    render() {
        const { closeDialog } = this.props
        const { invoice } = this.state
        return (
            <Dialog open={true} onClose={closeDialog} scroll="body">
                <DialogTitle>Invoice Details</DialogTitle>
                <DialogContent>
                    { !this.state.invoice && <DialogContentText>Loading Invoice Info ...</DialogContentText> }
                    { invoice && 
                        <React.Fragment>
                            <List style={{ maxHeight: 500, overflowY: 'scroll' }} >
                                <ListSubheader>Remarks with this Invoice</ListSubheader>
                                { this.state.remarks.map((remark, i) => (
                                    <MenuItem key={i}>
                                        <ListItemText primary={`${remark.data().author} - ${remark.data().content}`} secondary={moment(remark.data().notification).format("DD/MM/YYYY")} />     
                                        <ListItemSecondaryAction>
                                            <IconButton color="secondary">
                                                <Delete/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </MenuItem> 
                                )) }
                            </List>
                            <Divider/>
                            <List>
                                <ListSubheader>Invoice Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={invoice.invoice_no} secondary="Invoice No."/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.type} secondary="Invoice Type"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.employment_contract_no} secondary="Employment Contract No"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.helper.name} secondary="Helper"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.employer.name} secondary="Employer"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListSubheader>Payment Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={invoice.payment.pay_date || "-"} secondary="Pay Date"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.payment.price || "-"} secondary="Price"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.payment.sales || "-"} secondary="Sales"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListSubheader>Immigration Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={invoice.immigration.entry || "-"} secondary="Entry Date"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.immigration.visa_aquire || "-"} secondary="Visa Aquire"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.immigration.visa_expire || "-"} secondary="Visa Expire"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.immigration.visa_incomplete ? "Yes" : "No"} secondary="Visa Incomplete"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListSubheader>Consualte Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={invoice.consulate.entry || "-"} secondary="Entry"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.consulate.exit || "-"} secondary="Exit"/>
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListSubheader>Arrival Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={invoice.arrival.pickup || "-"} secondary="Pickup Date"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={invoice.arrival.ticket_aboard || "-"} secondary="Ticket Board Date"/>
                                </ListItem>
                            </List>
                        </React.Fragment>
                    }
                </DialogContent>
            </Dialog>
        )
    }
}