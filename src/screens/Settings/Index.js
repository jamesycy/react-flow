// @flow
import React from 'react'
import { Paper, MenuList, MenuItem, ListItemText } from '@material-ui/core'

export default class Settings extends React.Component<any> {
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

                    <MenuItem>
                        <ListItemText primary="Signout" />
                    </MenuItem>
                </MenuList>
            </Paper>
        )
    }
}