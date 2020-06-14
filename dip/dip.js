/**
 * Class representing the buying process
 */
export class Store {
  /**
   * Create Customer and Payment
   * @param {string} customer
   * @param {string} payment
   */
  constructor (customer, payment) {
    this.customer = new Customer(customer)
    this.payment = new PaymentProcessor(this.customer, payment)
  }

  /**
   * Buy jeans
   * @param {number} quantity
   */
  purchaseJeans (quantity) {
    this.payment.pay(quantity)
  }

  /**
   * Buy books
   * @param {number} quantity
   */
  purchaseBooks (quantity) {
    this.payment.pay(quantity)
  }
}

/**
 * Class representing customer
 */
export class Customer {
  constructor (name) {
    this.name = name
  }
}

/**
 * Class representing Dependency Inversion Principle
 * Abstraction Layer between buying and paying processes
 */
export class PaymentProcessor {
  /**
   * Define customer and payment
   * @param {string} customer
   * @param {string} payment
   */
  constructor (customer, payment) {
    this.customer = customer
    this.payment = payment
  }

  /**
   * Method representing Strategy Pattern for Payment
   * @param {number} quantity
   *
   */
  pay (quantity) {
    let payment = null

    switch (this.payment) {
      case 'Stripe':
        payment = new Stripe()
        break
      case 'PayPal':
        payment = new PayPal()
        break
      case 'Cash':
        payment = new Cash()
        break
      default:
        break
    }

    if (!payment) {
      console.log('Error: Payment must be defined')
      return
    }

    return payment.makePayment(this.customer, quantity)
  }
}

export class Stripe {
  makePayment (user, quantity) {
    console.log(`${user.name} paid for ${quantity} amounts by Stripe ($)`)
  }
}

export class PayPal {
  makePayment (user, quantity) {
    console.log(`${user.name} paid for ${quantity} amounts by PayPal (Euro)`)
  }
}

export class Cash {
  makePayment (user, quantity) {
    console.log(`${user.name} paid for ${quantity} amounts in cash (Rubles)`)
  }
}

const buy = new Store('Olga', 'Stripe')
buy.purchaseBooks(2)
