// @flow
import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/firestore'

type Props = {
    remark_id: string,
    deletePrompt: boolean,
    closePrompt: Function
}

export default class DeletePrompt extends React.Component<Props> {
    removeRemark = async () => {
        const { remark_id, closePrompt } = this.props
        await firebase.firestore().collection("remark").doc(remark_id).delete()
        closePrompt()
    }

    render() {
        const { deletePrompt, closePrompt } = this.props
        return (
            <Dialog open={deletePrompt} onClose={closePrompt}>
                <DialogTitle>Are you sure to delete this remark ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you click "Yes", this remark will be deleted. Are you sure ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.removeRemark} color="primary">Yes</Button>
                    <Button onClick={closePrompt} color="secondary">No</Button>
                </DialogActions>
            </Dialog>
        )
    }
}