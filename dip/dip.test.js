import { Customer, PaymentProcessor, Stripe } from 'dip'

const name = 'Olga'
const paymentStripe = 'Stripe'
const quantity = 3

// test Customer class
it('Customer should have a name "Olga"', () => {
  const cust = new Customer(name)

  expect(cust.name).toBe(name)
})

// test PaymentProcessor class
it('The Customer Olga wanted to pay by Stripe', () => {
  const process = new PaymentProcessor(name, paymentStripe)

  expect(process.customer).toEqual(name)
  expect(process.payment).toEqual(paymentStripe)
})

// test PaymentProcessor pay method (incl. mocking)
it('The Customer wanted to pay by Stripe', () => {
  PaymentProcessor.prototype.pay = jest.fn()
  const newPayment = new PaymentProcessor(name, paymentStripe)
  const stripe = new Stripe().makePayment(name, quantity)

  expect(newPayment.pay(quantity)).toEqual(stripe)
})
