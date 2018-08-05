// @flow
import React from 'react'
import { observer } from 'mobx-react'
import Navigation from '../stores/navigation'

import InvoiceTable from '../screens/InvoiceTable/InvoiceTable'
import RemarkList from '../screens/RemarkList/RemarkList'
import AddForm from '../screens/Add/Index'
import Search from '../screens/Search/Index'

type navigationProps = {
  navigations: Navigation
}

@observer(["navigations"])
class Router extends React.Component<navigationProps> {
  render() {
    const { currentIndex } = this.props.navigations
    return (
      <div style={{ marginBottom: 56 }}>
        { currentIndex === 0 && <InvoiceTable/> }
        { currentIndex === 1 && <RemarkList /> }
        { currentIndex === 2 && <AddForm /> }
        { currentIndex === 3 && <Search /> }
      </div>
    )
  }
}

export default Router
