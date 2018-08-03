// @flow
import { observable } from 'mobx'

class Navigation {
  @observable currentIndex: number = 0

  changeIndex(index: number) {
    this.currentIndex = index
  }
}

export default Navigation
