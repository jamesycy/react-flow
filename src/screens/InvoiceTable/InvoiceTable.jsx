// @flow
import React from 'react'
import Invoice from '../../types/Invoice'
import firebase from 'firebase/app'
import 'firebase/firestore'

// Material UI Imports
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'
// Dialog Imports
import ModalForm from './forms/Modal'

type InvoiceState = {
  subscription: ?Function,
  invoices: Array<Invoice>,
  toggle: string,
  target: ?Invoice
}

export default class InvoiceTable extends React.Component<any, InvoiceState> {
  state = {
    subscription: null,
    invoices: [],
    toggle: "",
    target: null
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
    const query = firebase.firestore().collection("invoice").orderBy('created_at', "desc").limit(25).onSnapshot(snapshot => {
      const data = []
      snapshot.forEach(invoice => {
        data.push({ ...invoice.data(), id: invoice.id })
      })
      this.setState(state => {
        state.invoices = data
        state.subscription = query
        return state
      })
    })
  }

  componentWillUnmount() {
    this.state.subscription && this.state.subscription()
  }

  toggle = (type: string, target: Invoice) => {
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

  render() {
    const { invoices } = this.state
    return (
      <Paper style={this.styles.container}>
        <Table style={this.styles.table}>
          <TableHead>
            <TableRow>
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
            { invoices.map((invoice, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("info", invoice)}>{ invoice.invoice_no }</Button>
                </TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("helper", invoice)}>{ invoice.helper.name }</Button>
                </TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("employer", invoice)}>{ invoice.employer.name }</Button>
                </TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("payment", invoice)}>{ invoice.payment.pay_date || "-" }</Button>
                </TableCell>
                <TableCell>{ invoice.employment_contract_no || "-" }</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("immigration", invoice)}>{ invoice.immigration.entry || "-" }</Button>
                </TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("consulate", invoice)}>{ invoice.consulate.entry || "-" }</Button>
                </TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => this.toggle("arrival", invoice)}>{ invoice.arrival.pickup }</Button>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>

        { this.state.toggle !== "" && this.state.target && <ModalForm values={this.state.target} toggle={this.state.toggle} closePrompt={this.closePrompt}  /> }

      </Paper>
    )
  }
}
