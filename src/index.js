import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import App from './App'

import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebase.json'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings( { timestampsInSnapshots: true })

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
