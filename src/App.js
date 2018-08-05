import React from 'react'
import { Provider } from 'mobx-react'
import AppBar from './components/AppBar'
import Router from './components/Router'
import BottomTabBar from './components/BottomTabBar'

import Login from './components/Login'

// Stores Imports
import Navigation from './stores/navigation'
import Authentication from './stores/authentication'

import firebase from 'firebase/app'
import 'firebase/auth'

type State = {
  authenticated: boolean
}

class App extends React.Component<any, State> {
  navigationStore = new Navigation()
  authenticationStore = new Authentication()

  state = {
    authenticated: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authenticationStore.setUser(user)
        this.setState({ authenticated: true })
      } else {
        this.authenticationStore.removeUser()
        this.setState({ authenticated: false })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        { this.state.authenticated ? 
          <Provider navigations={this.navigationStore} authentication={this.authenticationStore}>
          <div>
            <AppBar/>
            <Router/>
            <BottomTabBar/>
          </div>
        </Provider>
        :
        <Login/>
        }
      </React.Fragment>
    )
  }
}


export default App
