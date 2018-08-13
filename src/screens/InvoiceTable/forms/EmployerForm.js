// @flow
import React from 'react'
import EmployerType from '../../../types/Employer'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Formik, FieldArray } from 'formik'
import { Typography, Grid, TextField, Button, IconButton } from '../../../../node_modules/@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon} from '@material-ui/icons'

type FormProps = {
    values: EmployerType,
    isSubmitting: boolean,
    handleChange: Function,
    handleSubmit: Function
}

class EmployerForm extends React.Component<FormProps> {
    render() {
        const { isSubmitting, handleChange, handleSubmit, values } = this.props
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="headline">Employer Info</Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Name"
                        value={values.name} name="name" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="Nickname"
                        value={values.nickname} name="nickname" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="District"
                        value={values.district} name="district" onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                    <TextField fullWidth disabled={isSubmitting} label="HKID"
                        value={values.hkid} name="hkid" onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth disabled={isSubmitting} label="Referral"
                        value={values.refer} name="refer" onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="headline">Contacts List</Typography>
                </Grid>

                <Grid item xs={12}>
                    <FieldArray name="contacts"
                        render={({ remove, push }) => (
                            <React.Fragment>
                                { values.contacts.map((contact, i) => (
                                    <Grid container spacing={16} key={i}>
                                        <Grid item xs={12}>
                                            <Typography variant="subheading">Contact #{i + 1}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth disabled={isSubmitting} label="Contact's Phone" name={`contacts[${i}].phone`}
                                                value={contact.phone} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField fullWidth disabled={isSubmitting} label="Contact's Name" name={`contacts[${i}.name`}
                                                value={contact.name} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <IconButton color="secondary" onClick={() => remove(i)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))}
                                <IconButton color="primary" onClick={() => push({ name: "", phone: "" })}>
                                    <AddIcon />
                                </IconButton>
                            </React.Fragment>
                        )} />
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
    employer: ?EmployerType
}

export default class employerFormWrapper extends React.Component<WrapperProps, WrapperState> {
    state = { employer: null }

    async componentDidMount() {
        const snapshot = await firebase.firestore().collection("employer").doc(this.props.id).get()
        this.setState({ employer: snapshot.data() })
    }

    submitEmployer = async (values: EmployerType, setSubmitting: Function) => {
        await firebase.firestore().collection("employer").doc(this.props.id).update(values)
        setSubmitting(false)
    }

    render() {
        const { employer } = this.state
        if (employer) {
            return <Formik initialValues={employer}
                onSubmit={(values, { setSubmitting }) => this.submitEmployer(values, setSubmitting)}
                render={props => <EmployerForm {...props} /> }/>
        }
        return (
            <Grid container spacing={16}>
                <Typography variant="headline">Loading Employer ...</Typography>
            </Grid>
        )
    }
}