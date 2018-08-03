import React from 'react'
import { Provider } from 'mobx-react'
import AppBar from './components/AppBar'
import Router from './components/Router'
import BottomTabBar from './components/BottomTabBar'

// Stores Imports
import Navigation from './stores/navigation'

class App extends React.Component<any> {
  navigationStore = new Navigation()

  render() {
    return (
      <Provider navigations={this.navigationStore}>
        <div>
          <AppBar/>
          <Router/>
          <BottomTabBar/>
        </div>
      </Provider>
    )
  }
}


export default App
