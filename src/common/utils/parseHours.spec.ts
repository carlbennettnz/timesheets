import { expect } from 'chai'

import { parseHours } from './parseHours'

describe('parseHours()', () => {
  it('parses empty strings as 0', () => {
    expect(parseHours('')).to.equal(0)
  })

  it('parses strings without numbers as 0', () => {
    expect(parseHours('asdf')).to.equal(0)
  })

  it(`parses '0' as 0`, () => {
    expect(parseHours('0')).to.equal(0)
  })

  it(`parses '1' as 1`, () => {
    expect(parseHours('1')).to.equal(1)
  })

  it(`parses '1:00' as 1`, () => {
    expect(parseHours('1:00')).to.equal(1)
  })

  it(`parses '1:30' as 1.5`, () => {
    expect(parseHours('1:30')).to.equal(1.5)
  })

  it(`parses '1:60' as 2`, () => {
    expect(parseHours('1:60')).to.equal(2)
  })

  it(`parses '1.5' as 1.5`, () => {
    expect(parseHours('1.5')).to.equal(1.5)
  })

  it(`parses '1.5:30' as 2`, () => {
    expect(parseHours('1.5:30')).to.equal(2)
  })

  it(`parses '-1' as 1`, () => {
    expect(parseHours('-1')).to.equal(1)
  })

  it(`parses '-1:00' as 1`, () => {
    expect(parseHours('-1:00')).to.equal(1)
  })

  it(`ignores whitespace`, () => {
    expect(parseHours('  1  :  45  ')).to.equal(1.75)
  })

  it(`ignores chars that aren't digits or colons`, () => {
    expect(parseHours(' a 1 b : $ 45 _ ')).to.equal(1.75)
  })

  it(`ignores everything after extra colons`, () => {
    expect(parseHours('1:15:40')).to.equal(1.25)
  })

  it(`handles single digit mins`, () => {
    expect(parseHours('1:06')).to.equal(1.1)
  })

  it(`doesn't need zero padding on mins`, () => {
    expect(parseHours('1:6')).to.equal(1.1)
  })

  it(`ignores zero padding on mins hours`, () => {
    expect(parseHours('0001:06')).to.equal(1.1)
  })
})
