// @flow
import React from 'react'
import { observer } from 'mobx-react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { ListAlt, EventNote, Add, Search, SettingsApplications } from '@material-ui/icons'
import navigation from '../stores/navigation'

type navigationProps = {
  navigations: navigation
}

@observer(["navigations"])
class BottomTabBar extends React.Component<navigationProps> {

  styles = {
    position: "fixed",
    bottom: 0,
    width: '100%'
  }

  changeTab = (event: Event, index: number) => {
    this.props.navigations.changeIndex(index)
  }

  render() {
    const { currentIndex } = this.props.navigations
    return (
      <BottomNavigation
        style={this.styles}
        value={currentIndex} showLabels
        onChange={this.changeTab}>
        <BottomNavigationAction label="Invoices" icon={<ListAlt/>} />
        <BottomNavigationAction label="Remarks" icon={<EventNote/>} />
        <BottomNavigationAction label="Add" icon={<Add/>} />
        <BottomNavigationAction label="Search" icon={<Search/>} />
        <BottomNavigationAction label="Settings" icon={<SettingsApplications/>} />
      </BottomNavigation>
    )
  }
}

export default BottomTabBar
