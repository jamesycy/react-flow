const mongoose = require("mongoose")
const moment = require("moment")
const firebase = require("firebase/app")
const firebaseConfig = require("../firebase.json")

require("firebase/firestore")

mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_w9mnpghs:vc0m4vnshlkgnmbaocdf7cvjin@ds231205.mlab.com:31205/heroku_w9mnpghs")

firebase.initializeApp(firebaseConfig)

const Invoice = require("./models/invoices")
const Helper = require("./models/helpers")
const Employer = require("./models/employers")

function CreateFSInvoiceIndex() {
    Invoice.find().then(function(result) {
        result.forEach(async function(invoice) {
            const _id = invoice._id.toString()
            const employer = await Employer.findById(invoice.client.toString())
            const helper = await Helper.findById(invoice.helper.toString())
            await firebase.firestore().collection("invoice_index").doc(_id).set({
                invoice_no: invoice.invoice_no,
                employer: { id: invoice.client.toString(), name: employer.name },
                helper: { id: invoice.helper.toString(), name: helper.name },
                created_at: moment().subtract("7", "days").format()
            })
            console.log(`Invoice Index: ${_id} DONE`)
        })
    })
}

function CreateFSHelperIndex() {
    Helper.find().then(function(result) {
        result.forEach(async function(helper) {
            const _id = helper._id.toString()
            await firebase.firestore().collection("helper_index").doc(_id).set({ name: helper.name, created_at: moment().subtract("7", "days").format() })
            console.log(`Helper Index: ${_id} DONE`)
        })
    })
}

function CreateFSEmployerIndex() {
    Employer.find().then(function(result) {
        result.forEach(async function(employer) {
            const _id = employer._id.toString()
            await firebase.firestore().collection("employer_index").doc(_id).set({ name: employer.name })
            console.log(`Employer Index: ${_id} DONE`)
        })
    })
}

async function FixFSInvoiceCreatedAt() {
    const batch = firebase.firestore().batch()
    const snapshot = await firebase.firestore().collection("invoice").get()
    snapshot.forEach(function(invoice) {
        if (!invoice.data().created_at) {
            batch.update(firebase.firestore().collection("invoice").doc(invoice.id), { "created_at": moment().subtract("7", "days").format() })
        }
    })
    batch.commit().then(function() {
        console.log("FIX Invoice Create_at DONE")
    })
}

async function FixFSHelperCreatedAt() {
    const batch = firebase.firestore().batch()
    const snapshot = await firebase.firestore().collection("helper").get()
    snapshot.forEach(function(helper) {
        batch.update(firebase.firestore().collection("helper").doc(helper.id), { created_at: moment().subtract("7", "days").format() })
    })
    batch.commit().then(function() {
        console.log("FIX Helper Created_at DONE")
    })
}

async function FixFSEmployerCreatedAt() {
    const batch = firebase.firestore().batch()
    const snapshot = await firebase.firestore().collection("employer").get()
    snapshot.forEach(function(employer) {
        batch.update(firebase.firestore().collection("employer").doc(employer.id), { created_at: moment().subtract("7", "days").format() })
    })
    batch.commit().then(function() {
        console.log("FIX Employer Created_at DONE")
    })
}

FixFSInvoiceCreatedAt()
