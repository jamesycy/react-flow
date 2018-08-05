// @flow
import { observable } from 'mobx'
import firebase from 'firebase/app'

export default class Authentication {
    @observable currentUser: ?firebase.User

    setUser(user: firebase.User) {
        this.currentUser = user
    }

    removeUser() {
        this.currentUser = null
    }

}