// @flow
import React from 'react'
import { withFormik } from 'formik'
import { Stepper, Step, StepLabel, Button, Grid } from '@material-ui/core'
import InvoiceType from '../../../types/InvoiceFormType'

import Step1 from './Step1'

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

    render() {
        const { currentStep, totalSteps, stepLabels } = this.state
        const { values, isSubmitting, handleChange, handleSubmit, setFieldValue } = this.props
        return (
            <React.Fragment>
                <Stepper activeStep={currentStep}>
                    { stepLabels.map((label, i) => (
                        <Step key={i}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                { currentStep === 0 && <Step1 values={values} isSubmitting={isSubmitting} handleChange={handleChange} setFieldValue={setFieldValue} /> }

                <Grid container style={{ marginTop: 20 }}>
                    <Grid item xs={12}>
                        <Button disabled={currentStep <= 0} onClick={this.prevStep}>Previous</Button>
                        <Button disabled={currentStep === totalSteps} onClick={handleSubmit}>Next</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withFormik({
    handleSubmit: (values, { setSubmitting, resetForm }) => {
        console.log(values)
        setSubmitting(false)
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