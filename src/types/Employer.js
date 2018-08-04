// @flow

export default class Employer {
    name: string
    nickname: string
    refer: string
    district: string
    hkid: string
    contacts: Array<Contact>
}

type Contact = {
    name: string,
    phone: string
}