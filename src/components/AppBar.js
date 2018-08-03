// @flow
import React from 'react'
// Material UI Component Imports
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Lock } from '@material-ui/icons'

class TopAppBar extends React.Component<any> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="title" style={{ flexGrow: 1 }}>Limastar Invoices</Typography>

          <IconButton color="inherit">
            <Lock/>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default TopAppBar
