// @flow
import React from 'react'
import { Paper, MenuList, MenuItem, ListItemText } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class Settings extends React.Component<any> {
    logout = () => {
        firebase.auth().signOut()
    }
    
    render() {
        return (
            <Paper>
                <MenuList>
                    <MenuItem>
                        <ListItemText primary="Profile" secondary="Manage Your Profile" />
                    </MenuItem>

                    <MenuItem>
                        <ListItemText primary="Manage Accounts" secondary="Configure Other Accounts Permissions"/>
                    </MenuItem>

                    <MenuItem onClick={this.logout}>
                        <ListItemText primary="Signout" />
                    </MenuItem>
                </MenuList>
            </Paper>
        )
    }
}