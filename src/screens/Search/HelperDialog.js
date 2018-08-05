// @flow
import React from 'react'
import Helper from '../../types/Helper'
import { Dialog, DialogTitle, DialogContent, DialogContentText, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'

type Props = {
    id: string,
    closeDialog: Function
}

type State = {
    helper: ?Helper
}

export default class HelperDialog extends React.Component<Props, State> {
    state = {
        helper: null
    }

    async componentDidMount() {
        const snapshot = await firebase.firestore().collection("helper").doc(this.props.id).get()
        this.setState({ helper: snapshot.data() })
    }

    render() {
        const { helper } = this.state
        return (
            <Dialog open={true} onClose={this.props.closeDialog} scroll="body">
                <DialogTitle>Helper Detail</DialogTitle>
                <DialogContent>
                    { !helper && <DialogContentText>Loading ...</DialogContentText> }
                    { helper && 
                        <React.Fragment>
                            <List>
                                <ListSubheader>Helper Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={helper.name} secondary="Name"/>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={helper.op || "-"} secondary="OP/OI" />
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={helper.age || "-"} secondary="Age" />
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={helper.nationality || "-"} secondary="Nationality" />
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={helper.email || "-"} secondary="Email" />
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={helper.phone || "-"} secondary="Phone No" />
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={helper.refer || "-"} secondary="Referral" />
                                </ListItem>
                            </List>
                        </React.Fragment>
                    }
                </DialogContent>
            </Dialog>
        )
    }
}