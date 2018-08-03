// @flow
import React from 'react'
import { Formik } from 'formik'
import { Modal, Paper } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'
import InvoiceType from '../../../types/Invoice'

import InfoForm from './InfoForm'
import PaymentForm from './PaymentForm'
import ImmigrationForm from './ImmigrationForm'
import ConsulateForm from './ConsulateForm'
import ArrivalForm from './ArrivalForm'

type ModalFormProps = {
    values: InvoiceType,
    toggle: string,
    closePrompt: Function,
}

export default class InfoFormWrapper extends React.Component<ModalFormProps> {
    styles = {
        modal: {
            width: '90%',
            padding: 10,
            position: 'absolute',
            top: 50,
            left: '5%'
        }
    }

    submitForm = async (values: InvoiceType, setSubmitting: Function) => {
        const id = this.props.values.id
        const batch = firebase.firestore().batch()
        batch.update(firebase.firestore().collection("invoice").doc(id), values)
        // batch.update(firebase.firestore().collection("invoice_index").doc(id), {invoice_no: values.invoice_no})
        await batch.commit()
        setSubmitting(false)
    }

    renderForm = (props: Object) => {
        const { toggle } = this.props
        if (toggle === "info") return <InfoForm {...props} />
        if (toggle === "payment") return <PaymentForm {...props} />
        if (toggle === "immigration") return <ImmigrationForm {...props} />
        if (toggle === "consulate") return <ConsulateForm {...props} />
        if (toggle === "arrival") return <ArrivalForm {...props} />
    }

    render() {
        const { toggle, values, closePrompt } = this.props
        return (
            <Modal open={toggle !== "" && values !== null} onClose={closePrompt}>
                <Paper style={this.styles.modal}>
                    <Formik 
                        initialValues={values}
                        onSubmit={(values, { setSubmitting }) => this.submitForm(values, setSubmitting)}
                        render={props => this.renderForm(props) }/>
                </Paper>
            </Modal>
        )
    }
}