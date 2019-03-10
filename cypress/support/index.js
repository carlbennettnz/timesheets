// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

Cypress.on('window:before:load', win => {
  // console.log('deleting database')
  // win.indexedDB.deleteDatabase('timesheets')
})

/*

- test that the db can be created by timesheets app once
- in all other cases, create the db as part of the test

*/
