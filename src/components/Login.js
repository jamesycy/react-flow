// @flow
import React from 'react'
import { Paper, TextField, Button, Grid, Typography } from '@material-ui/core'
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
    styles = {
        container: {
            marginTop: 100,
            width: "50%",
            height: "50%",
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto"
        },
    }

    render() {
        const { values, handleChange, handleSubmit, isSubmitting } = this.props
        return (
            <Paper style={this.styles.container}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Typography variant="headline">Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email" name="email" disabled={isSubmitting} fullWidth
                                value={values.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Password" name="password" disabled={isSubmitting} fullWidth type="password"
                                value={values.password} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSubmit}>Login</Button>
                        </Grid>
                    </Grid>
                </form>
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