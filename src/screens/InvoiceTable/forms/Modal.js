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

import HelperForm from './HelperForm'
import EmployerForm from './EmployerForm'

type ModalFormProps = {
    values: InvoiceType,
    toggle: string,
    closePrompt: Function,
}

export default class InfoFormWrapper extends React.Component<ModalFormProps> {
    styles = {
        modal: {
            width: '90%',
            padding: 20,
            position: 'absolute',
            top: 50,
            left: '5%'
        }
    }

    submitInvoiceForm = async (values: InvoiceType, setSubmitting: Function) => {
        const id = this.props.values.id
        const batch = firebase.firestore().batch()
        batch.update(firebase.firestore().collection("invoice").doc(id), values)
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
            <Modal open={toggle !== "" && values !== null} onClose={closePrompt} style={{ overflowY: 'scroll' }}>
                <Paper style={this.styles.modal}>
                    { this.props.toggle !== "employer" || this.props.toggle !== "helper" ?
                        <Formik 
                            initialValues={values}
                            onSubmit={(values, { setSubmitting }) => this.submitInvoiceForm(values, setSubmitting)}
                            render={props => this.renderForm(props) }/>
                        : null
                    }
                    { this.props.toggle === "employer" && <EmployerForm id={values.employer.id} /> }
                    { this.props.toggle === "helper" && <HelperForm id={values.helper.id} /> }
                </Paper>
            </Modal>
        )
    }
}