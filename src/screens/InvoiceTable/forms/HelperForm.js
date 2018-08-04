// @flow
import React from 'react'
import HelperType from '../../../types/Helper'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Formik } from 'formik'
import { Typography, Grid, TextField, Button } from '../../../../node_modules/@material-ui/core';

type FormProps = {
    values: HelperType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

class HelperForm extends React.Component<FormProps> {
    render() {
        const { isSubmitting, handleChange, handleSubmit, values } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="headline">Helper Info</Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Name"
                        value={values.name} name="name" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="OP"
                        value={values.op} name="op" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Age"
                        value={values.age} name="age" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Nationality"
                        value={values.nationality} name="nationality" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Phone No."
                        value={values.phone} name="phone" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Refer"
                        value={values.refer} name="refer" onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth disabled={isSubmitting} label="Email"
                        value={values.email} name="email" onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}

type WrapperProps = {
    id: string
}

type WrapperState = {
    helper: ?HelperType
}

export default class HelperFormWrapper extends React.Component<WrapperProps, WrapperState> {
    state = { helper: null }

    async componentDidMount() {
        const snapshot = await firebase.firestore().collection("helper").doc(this.props.id).get()
        this.setState({ helper: snapshot.data() })
    }

    submitHelper = async (values: HelperType, setSubmitting: Function) => {
        await firebase.firestore().collection("helper").doc(this.props.id).update(values)
        setSubmitting(false)
    }

    render() {
        const { helper } = this.state
        if (helper) {
            return <Formik initialValues={helper}
                onSubmit={(values, { setSubmitting }) => this.submitHelper(values, setSubmitting)}
                render={props => <HelperForm {...props} /> }/>
        }
        return (
            <Grid container spacing={16}>
                <Typography variant="headline">Loading Helper ...</Typography>
            </Grid>
        )
    }
}