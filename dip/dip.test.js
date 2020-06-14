import { Customer } from 'dip'

it('Customer should have a name "Olga"', () => {
  const cust = new Customer('Olga')

  expect(cust.name).toBe('Olga')
})
