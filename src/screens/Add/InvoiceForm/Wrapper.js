// @flow
import React from 'react'
import { withFormik } from 'formik'
import { Stepper, Step, StepLabel, Button, IconButton, Grid } from '@material-ui/core'
import { Save } from "@material-ui/icons"
import InvoiceType from '../../../types/InvoiceFormType'

import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

import Step1 from './InvoiceInfo'
import Step2 from './PaymentInfo'
import Step3 from './Immigration'
import Step4 from './Consulate'
import Step5 from './Arrival'

type FormProps = {
    values: InvoiceType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function,
    setFieldValue: Function
}

type FormState = {
    currentStep: number,
    totalSteps: number,
    stepLabels: Array<string>
}

class InvoiceFormWrapper extends React.Component<FormProps, FormState> {
    state = {
        currentStep: 0,
        totalSteps: 5,
        stepLabels: ["Invoice Info", "Payment Info", "Immigration", "Consulate", "Pickup", "Confirm"]
    }

    nextStep = () => {
        if (this.state.currentStep >= 0 && this.state.currentStep !== this.state.totalSteps) {
            this.setState({ currentStep: this.state.currentStep + 1 })
        }
    }

    prevStep = () => {
        if (this.state.currentStep > 0) {
            this.setState({ currentStep: this.state.currentStep - 1 })
        }
    }

    submit = () => {
        this.setState(state => {
            state.currentStep = 0
            return state
        })
        this.props.handleSubmit()
    }

    render() {
        const { currentStep, totalSteps, stepLabels } = this.state
        const { values, isSubmitting, handleChange, setFieldValue } = this.props
        return (
            <React.Fragment>
                <Stepper activeStep={currentStep}>
                    { stepLabels.map((label, i) => (
                        <Step key={i}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                { currentStep === 0 && <Step1 {...{ values, isSubmitting, handleChange, setFieldValue }} /> }
                { currentStep === 1 && <Step2 {...{ values, isSubmitting, handleChange }} /> }
                { currentStep === 2 && <Step3 {...{ values, isSubmitting, handleChange }} /> }
                { currentStep === 3 && <Step4 {...{ values, isSubmitting, handleChange }} /> }
                { currentStep === 4 && <Step5 {...{ values, isSubmitting, handleChange }} />}

                <Grid container style={{ marginTop: 20 }}>
                    <Grid item xs={12}>
                        <Button disabled={currentStep <= 0 || isSubmitting} onClick={this.prevStep}>Previous</Button>
                        { currentStep !== 5 ?
                            <Button disabled={currentStep === totalSteps} onClick={this.nextStep}>Next</Button>
                            :
                            <IconButton color="primary" disabled={isSubmitting} onClick={this.submit}>
                                <Save/>
                            </IconButton>
                        }
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withFormik({
    handleSubmit: async (values, { setSubmitting, resetForm }) => {
        values.created_at = moment().format()
        const snapshot: firebase.firestore.DocumentData = await firebase.firestore().collection("invoice").add(values)
        await firebase.firestore().collection("invoice_index").doc(snapshot.id).set({
            created_at: values.created_at,
            employer: values.employer,
            helper: values.helper,
            invoice_no: values.invoice_no
        })
        setSubmitting(false)
        resetForm()
    },
    mapPropsToValues: (values) => ({
        invoice_no: "", type: "", employment_contract_no: "",
        helper: { id: "", name: "" }, employer: { id: "", name: "" },
        payment: { pay_date: "", price: 0, sales: "" },
        immigration: { entry: "", visa_aquire: "", visa_expire: "", visa_incomplete: false },
        consulate: { entry: "", exit: "" },
        arrival: { pickup: "", ticket_aboard: "" }
    })
})(InvoiceFormWrapper)