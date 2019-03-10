/// <reference types="Cypress" />

describe('viewing existing entries', () => {
  it.skip('shows none if there are none', () => {
    cy.setEntries([])
    cy.visit('/')
    cy.contains(`There aren't any timesheet entries to display yet`)
  })

  it('shows one if there is one', () => {
    cy.setEntries([
      { day: '2019-03-05', hours: 5.5, notes: 'time spent on x...' },
      { day: '2019-03-06', hours: 5.5, notes: 'time spent on x...' }
    ])

    cy.visit('/')
    cy.contains('5.5')
  })
})
