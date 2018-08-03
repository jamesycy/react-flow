// @flow

export default class Invoice {
    invoice_no: string
    employment_contract_no: string
    type: string
  
    payment: {
      pay_date: string,
      price: number,
      sales: string
    }
  
    immigration: {
      entry: string,
      visa_aquire: string,
      visa_expire: string,
      visa_incomplete: boolean
    }
  
    helper: {
      id: string,
      name: string
    }
  
    employer: {
      id: string,
      name: string
    }
  
    consulate: {
      entry: string,
      exit: string,
    }
  
    arrival: {
      pickup: string,
      ticket_aboard: string
    }
  
  }
  