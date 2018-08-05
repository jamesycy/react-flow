// @flow
import React from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import { withFormik } from 'formik'
import firebase from 'firebase/app'
import 'firebase/auth'

type Credentials = {
    email: string,
    password: string
}

type Props = {
    values: Credentials,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

class Login extends React.Component<Props> {
    render() {
        const { values, handleChange, handleSubmit, isSubmitting } = this.props
        return (
            <Paper style={{ flexGrow: 1, display: "flex", height: "100%" }}>
                <div style={{ justifyContent: "center", alignItems: 'center', maxWidth: 700 }}>
                    <TextField fullWidth label="Email" type="email" value={values.email} onChange={handleChange} disabled={isSubmitting} name="email" />
                    <TextField fullWidth label="Password" type="password" value={values.password} onChange={handleChange} disabled={isSubmitting} name="password" />
                    <Button color="primary" onClick={handleSubmit}>Login</Button>
                </div>
            </Paper>
        )
    }
}

export default withFormik({
    mapPropsToValues: (values) => ({
        email: "",
        password: ""
    }),
    handleSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        } catch(err) {
            console.log(err)
        }
        setSubmitting(false)
        resetForm()
    }
})(Login)