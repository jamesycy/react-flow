// @flow

export default class Invoice {
  id: string
  invoice_no: string
  employment_contract_no: string
  type: string
  
  helper: Helper_Index
  employer: Employer_Index

  payment: Payment
  immigration: Immigration
  consulate: Consulate
  arrival: Arrival

}

export class Employer_Index {
  id: string
  name: string
}

export class Helper_Index {
  id: string
  name: string
}

export class Payment {
  pay_date: string
  price: number
  sales: string
}

export class Immigration {
  entry: string
  visa_aquire: string
  visa_expire: string
  visa_incomplete: boolean
}

export class Consulate {
  entry: string
  exit: string
}

export class Arrival {
  pickup: string
  ticket_aboard: string
}