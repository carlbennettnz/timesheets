import { expect } from 'chai'

import { formatHours } from './formatHours'

describe('formatHours()', () => {
  it('renders 0:00 if given undefined', () => {
    expect(formatHours(undefined)).to.equal('0:00')
  })

  it('renders 0:00 if given NaN', () => {
    expect(formatHours(NaN)).to.equal('0:00')
  })

  it('renders 0:00 if given a negative number', () => {
    expect(formatHours(-5)).to.equal('0:00')
  })

  it('renders x:00 if input is an int', () => {
    expect(formatHours(5)).to.equal('5:00')
  })

  it('renders x:30 if input is an int + .5', () => {
    expect(formatHours(5.5)).to.equal('5:30')
  })

  it('never renders x:60', () => {
    expect(formatHours(5.99999999999)).to.equal('5:59')
  })

  it('rounds down', () => {
    expect(formatHours(5.49999999999)).to.equal('5:29')
  })
})
