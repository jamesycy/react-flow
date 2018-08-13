import React from 'react'
// Material UI Imports
import { Grid, TextField, Typography, Button, Popper, ClickAwayListener, Paper, List, MenuItem, ListItemText } from '@material-ui/core'
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
        const { values, handleChange, handleSubmit, isSubmitting, setFieldValue } = this.props
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

                <InvoiceSearchField setFieldValue={setFieldValue} isSubmitting={isSubmitting} />

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
        invoice: ""
    }),
    handleSubmit: async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        values.notification = moment(values.notification).format()
        await firebase.firestore().collection("remark").add(values)
        setSubmitting(false)
        resetForm()
    }
})(RemarkForm)





type SearchProps = {
    setFieldValue: Function,
    isSubmitting: boolean
}

type SearchState = {
    search: "",
    show: boolean,
    selected: boolean,
    suggestions: Array<firebase.firestore.QueryDocumentSnapshot>,
    anchor: ?HTMLElement
}

class InvoiceSearchField extends React.Component<SearchProps, SearchState> {
    state = {
        search: "",
        show: false,
        selected: false,
        suggestions: [],
        anchor: null
    }

    handleChange = (target) => {
        this.setState(state => {
            state.anchor = target
            state.search = target.value
            return state
        })
    }

    clickAwayListener = () => {
        this.setState(state => {
            state.show = false
            return state
        })
    }

    search = async () => {
        const ref = firebase.firestore().collection("invoice")
        const byInvoiceNo = await ref.where("invoice_no", ">=", this.state.search).where("invoice_no", "<=", this.state.search+"\uf8ff").limit(10).get()
        const byHelper = await ref.where("helper.name", ">=", this.state.search).where("helper.name", "<=", this.state.search+"\uf8ff").limit(10).get()
        const byEmployer = await ref.where("employer.name", ">=", this.state.search).where("employer.name", "<=", this.state.search+"\uf8ff").limit(10).get()
        this.setState(state => {
            state.suggestions = byInvoiceNo.docs.concat(byHelper.docs).concat(byEmployer.docs)
            state.show = true
            state.selected = false
            return state
        })
        console.log(this.state)
    }

    setSelected = (id, invoice_no) => {
        this.props.setFieldValue("invoice_id", id)
        this.props.setFieldValue("invoice_no", invoice_no)
        this.setState(state => {
            state.selected = true;
            state.show = false;
            return state
        })
    }

    render() {
        const { isSubmitting } = this.props
        return (
            <Grid item md={6}>
                <TextField fullWidth label="Search Invoice" value={this.state.search} onChange={(e) => this.handleChange(e.target)} disabled={isSubmitting}
                    onKeyPress={(e) => { e.key === "Enter" && this.search() }}/>
                <Popper open={this.state.show && this.state.search.length > 0 && !this.state.selected} style={{ height: 300 }}
                    anchorEl={this.state.anchor}>
                    <ClickAwayListener onClickAway={this.clickAwayListener}>
                        <Paper>
                            { this.state.suggestions.length > 0 &&
                                <List>
                                    { this.state.suggestions.map((invoice, i) => (
                                        <MenuItem key={i} onClick={() => this.setSelected(invoice.id, invoice.data().invoice_no)}>
                                            <ListItemText primary={invoice.data().invoice_no} secondary={`${invoice.data().helper.name} - ${invoice.data().employer.name}`} />
                                        </MenuItem>
                                    ))}
                                </List>
                            }
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </Grid>
        )
    }
}