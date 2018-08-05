// @flow
import React from 'react'
import Invoice from '../../types/Invoice'
import firebase from 'firebase/app'
import 'firebase/firestore'

// Material UI Imports
import { Paper, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Button, IconButton } from '@material-ui/core'
import { SkipPrevious, SkipNext } from '@material-ui/icons'
// Dialog Imports
import ModalForm from './forms/Modal'

type InvoiceState = {
  subscription: ?firebase.firestore.QuerySnapshot,
  invoices: firebase.firestore.QueryDocumentSnapshot[],
  toggle: string,
  target: ?Invoice,
  first_item: ?firebase.firestore.DocumentSnapshot,
  last_item: ?firebase.firestore.DocumentSnapshot
}

export default class InvoiceTable extends React.Component<any, InvoiceState> {
  firestore_ref = firebase.firestore().collection("invoice").orderBy("created_at", "desc")

  state = {
    subscription: null,
    invoices: [],
    toggle: "",
    target: null,
    first_item: null,
    last_item: null
  }

  styles = {
    container: {
      width: '100%',
      overflowX: 'scroll'
    },
    table: {
      minHeight: 700
    }
  }

  componentDidMount() {
    const query: firebase.firestore.QuerySnapshot = this.firestore_ref.limit(25).onSnapshot(snapshot => {
      if (snapshot.docs.length > 0) {
        this.setState(state => {
          state.invoices = snapshot.docs
          state.first_item = snapshot.docs[0]
          state.last_item = snapshot.docs[snapshot.docs.length - 1]
          state.subscription = query
          return state
        })
      }
    })
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription()
    }
  }

  toggle = (type: string, target: Invoice, id: string) => {
    target.id = id
    this.setState(state => {
      state.toggle = type
      state.target = target
      return state
    })
  }

  closePrompt = () => {
    this.setState(state => {
      state.toggle = ""
      state.target = null
      return state
    })
  }

  previousePage = () => {
    if (this.state.subscription) this.state.subscription()
    const query: firebase.firestore.QuerySnapshot = firebase.firestore().collection('invoice').orderBy("created_at").startAfter(this.state.first_item).limit(25).onSnapshot(snapshot => {
      if (snapshot.docs.length >= 24) {
        this.setState(state => {
          state.subscription = query
          state.invoices = snapshot.docs.reverse()
          state.first_item = snapshot.docs[snapshot.docs.length - 1]
          state.last_item = snapshot.docs[0]
          return state
        })
      }
    })
  }

  nextPage = () => {
    if (this.state.subscription) this.state.subscription()
    const query: firebase.firestore.QuerySnapshot = this.firestore_ref.startAfter(this.state.last_item).limit(25).onSnapshot(snapshot => {
      if (snapshot.docs.length > 0) {
        this.setState(state => {
          state.subscription = query
          state.invoices = snapshot.docs
          state.first_item = snapshot.docs[0]
          state.last_item = snapshot.docs[snapshot.docs.length - 1]
          return state
        })
      }
    })
  }

  render() {
    return (
      <Paper style={this.styles.container}>
        <Table style={this.styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Invoice No.</TableCell>
              <TableCell>Helper</TableCell>
              <TableCell>Employer</TableCell>
              <TableCell>Payment Info</TableCell>
              <TableCell>Contract No.</TableCell>
              <TableCell>Immigration</TableCell>
              <TableCell>Consulate</TableCell>
              <TableCell>Arrival</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { this.state.invoices.map((doc: firebase.firestore.QueryDocumentSnapshot, i: number) => {
              const invoice: Invoice = doc.data()
              return (
                <TableRow key={i}>
                  <TableCell>{ i + 1 }</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("info", invoice, doc.id)}>{ invoice.invoice_no }</Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("helper", invoice, doc.id)}>{ invoice.helper.name }</Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("employer", invoice, doc.id)}>{ invoice.employer.name }</Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("payment", invoice, doc.id)}>{ invoice.payment.pay_date || "-" }</Button>
                  </TableCell>
                  <TableCell>{ invoice.employment_contract_no || "-" }</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("immigration", invoice, doc.id)}>{ invoice.immigration.entry || "-" }</Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("consulate", invoice, doc.id)}>{ invoice.consulate.entry || "-" }</Button>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => this.toggle("arrival", invoice, doc.id)}>{ invoice.arrival.pickup || "-" }</Button>
                  </TableCell>
                </TableRow>
              )
            }) }
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>
                <IconButton onClick={this.previousePage}>
                  <SkipPrevious />
                </IconButton>

                <IconButton onClick={this.nextPage}>
                  <SkipNext />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        { this.state.toggle !== "" && this.state.target && <ModalForm values={this.state.target} toggle={this.state.toggle} closePrompt={this.closePrompt}  /> }

      </Paper>
    )
  }
}
