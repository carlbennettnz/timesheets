describe('viewing existing entries', () => {
  it('shows none if there are none', () => {
    cy.setEntries([])
    cy.visit('/')
    cy.contains(`There aren't any timesheet entries to display yet`)
  })

  it('shows one if there is one', () => {
    cy.setEntries([
      { date: new Date(2019, 0, 1), hours: 5.5, notes: 'time spent on x...' }
    ])

    cy.visit('/')
    cy.contains('5.5')
  })
})
