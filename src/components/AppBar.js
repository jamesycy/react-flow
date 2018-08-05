// @flow
import React from 'react'
// Material UI Component Imports
import { AppBar, Toolbar, Typography } from '@material-ui/core'

class TopAppBar extends React.Component<any> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="title" style={{ flexGrow: 1 }}>Limastar Invoices</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default TopAppBar
