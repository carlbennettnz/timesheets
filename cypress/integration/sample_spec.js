describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('/')
    cy.contains('Timesheets App')
  })
})
