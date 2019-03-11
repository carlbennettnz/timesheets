/// <reference types="Cypress" />

import { format, startOfMonth } from 'date-fns'

const SELECT_DAY_CELLS = 'td:nth-child(1)'
const SELECT_HOURS_CELLS = 'td:nth-child(2)'

describe('viewing existing entries', () => {
  it('shows all days in the month with 0 hours logged', () => {
    cy.setEntries([])
    cy.visit('/')

    cy.get(`${SELECT_HOURS_CELLS} input`).each(input => {
      expect(input.val()).to.include('0:00')
    })

    const dateSuffix = format(new Date(), 'MM/YYYY')
    cy.get(SELECT_DAY_CELLS).each((td, i) => {
      expect(td.text()).to.include(`${i + 1}/${dateSuffix}`)
    })
  })

  it('shows logged hours', () => {
    cy.setEntries([
      {
        day: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
        hours: 5.5,
        notes: 'time spent on x...'
      }
    ])
    cy.visit('/')

    cy.get('input')
      .eq(0)
      .should('have.value', '5:30')
    // cy.get('tbody tr').eq(0).contains('time spent on x...')
  })

  it('allows durations to be edited', () => {
    cy.setEntries([])
    cy.visit('/')

    cy.get('input')
      .first()
      .type('{selectall}2.5')
      .blur()
      .should('have.value', '2:30')
  })

  it('allows moving between cells using arrow keys', () => {
    cy.setEntries([
      {
        day: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
        hours: 1,
        notes: 'time spent on x...'
      }
    ])
    cy.visit('/')

    cy.get('tbody tr')
      .eq(1)
      .get('input')
      .first()
      .focus()
      .type('{uparrow}')

    cy.focused().should('have.value', '1:00')
  })
})
