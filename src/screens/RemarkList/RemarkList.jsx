// @flow
import React from 'react'
// Material UI Imports
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Avatar, IconButton } from '@material-ui/core'
import { Event, Delete } from '@material-ui/icons'
import Remark from '../../types/Remark'
import DeletePrompt from './DeletePrompt'

import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

type RemarkState = {
    subscription: ?Function,
    remarks: Array<Remark>,
    remark_id: string,
    deletePrompt: boolean
}

class RemarkList extends React.Component<any, RemarkState> {
    state = {
        subscription: null,
        remarks: [],
        remark_id: "",
        deletePrompt: false
    }

    componentDidMount() {
        const start = moment().format()
        const end = moment().add("3", "months").format()
        const query = firebase.firestore().collection("remark").orderBy("notification").startAt(start).endAt(end).onSnapshot(snapshot => {
            const data: Array<Remark> = []
            snapshot.forEach(remark => {
                data.push({ ...remark.data(), id: remark.id })
            })
            this.setState(state => {
                state.subscription = query
                state.remarks = data
                return state
            })
        })
    }

    componentWillUnmount() {
        this.state.subscription && this.state.subscription()
    }

    openDeletePrompt = (id: string) => {
        this.setState(state => {
            state.deletePrompt = true
            state.remark_id = id
            return state
        })
    }

    closePrompt = () => {
        this.setState(state => {
            state.deletePrompt = false
            state.remark_id = ""
            return state
        })
    }

    render() {
        const { remarks, deletePrompt, remark_id } = this.state
        return (
            <Paper>
                <List>
                    { remarks.map((remark: Remark, i: number) => (
                        <ListItem key={i}>
                            <Avatar>
                                <Event />
                            </Avatar>
                            <ListItemText primary={`${remark.author} - ${remark.content}`} secondary={moment(remark.notification).format("DD/MM/YYYY")} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.openDeletePrompt(remark.id)} color="secondary">
                                    <Delete/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) }
                </List>
                <DeletePrompt deletePrompt={deletePrompt} remark_id={remark_id} closePrompt={this.closePrompt} />
            </Paper>
        )
    }
}

export default RemarkList