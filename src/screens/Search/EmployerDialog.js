// @flow
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, List, ListItem, ListItemText, ListSubheader, Divider } from '@material-ui/core'
import Employer from '../../types/Employer'
import firebase from 'firebase/app'
import 'firebase/firestore'

type State = {
    employer: ?Employer
}

type Props = {
    id: string,
    closeDialog: Function
}

export default class EmployerDialog extends React.Component<Props, State> {
    state = {
        employer: null
    }

    async componentDidMount() {
        const snapshot = await firebase.firestore().collection("employer").doc(this.props.id).get()
        this.setState({ employer: snapshot.data() })
    }

    render() {
        const { employer } = this.state
        return (
            <Dialog open={true} onClose={this.props.closeDialog} scroll="body">
                <DialogTitle>Employer Detail</DialogTitle>
                <DialogContent>
                    { !employer && <DialogContentText>Loading ...</DialogContentText> }
                    { employer && 
                        <React.Fragment>
                            <List>
                                <ListSubheader>Employer Info</ListSubheader>
                                <ListItem>
                                    <ListItemText primary={employer.name} secondary="Name" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={employer.nickname} secondary="Nickname" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={employer.district} secondary="District" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={employer.hkid} secondary="HKID" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={employer.refer} secondary="Referral" />
                                </ListItem>
                            </List>
                            <Divider/>
                            <List>
                                <ListSubheader>Employer Contacts</ListSubheader>
                                { employer.contacts.map((contact, i) => (
                                    <ListItem key={i}>
                                        <ListItemText primary={contact.name} secondary={contact.phone}/>
                                    </ListItem>
                                ))}
                            </List>
                        </React.Fragment>
                    }
                </DialogContent>
            </Dialog>
        )
    }
}