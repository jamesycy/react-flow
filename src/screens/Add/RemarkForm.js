import React from 'react'
// Material UI Imports
import { Grid, TextField, Typography, Button } from '@material-ui/core'
import { withFormik } from 'formik'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

class RemarkForm extends React.Component<any> {
    styles = {
        container: {
            marginTop: 10
        },
        saveBtn: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    render() {
        const { values, handleChange, handleSubmit, isSubmitting } = this.props
        return (
            <Grid container spacing={16} style={this.styles.container}>
                <Grid item xs={12}>
                    <Typography variant="headline">New Remark</Typography>
                </Grid>

                <Grid item md={6}>
                    <TextField label="Author" fullWidth disabled={isSubmitting}
                        value={values.author} onChange={handleChange} name="author"/>
                </Grid>

                <Grid item md={6}>
                    <TextField label="Notification" fullWidth type="date" disabled={isSubmitting}
                        value={values.notification} onChange={handleChange} name="notification"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Content" multiline fullWidth disabled={isSubmitting}
                        value={values.content} onChange={handleChange} name="content"/>
                </Grid>

                <Grid item xs={12}>
                    <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        )
    }
}

export default withFormik({
    mapPropsToValues: (values) => ({
        author: "",
        content: "",
        notification: moment().format("YYYY-MM-DD"),
        invoice_no: ""
    }),
    handleSubmit: async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        values.notification = moment(values.notification).format()
        await firebase.firestore().collection("remark").add(values)
        setSubmitting(false)
        resetForm()
    }
})(RemarkForm)