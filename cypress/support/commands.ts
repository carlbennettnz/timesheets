import { openDb, DB } from 'idb'
import { Omit } from 'utility-types'

import { Entry } from '../../src/types/Entry'
import { updateSchema } from '../../src/effects/useDatabase'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare global {
  namespace Cypress {
    interface Chainable {
      setEntries: typeof setEntries
    }
  }
}

let dbPromise: Promise<DB> | undefined

const setEntries = async (entries: Omit<Entry, 'id'>[]) => {
  if (!dbPromise) dbPromise = openDb('timesheets', 1, updateSchema)

  const db = await dbPromise
  const tx = db.transaction('entries', 'readwrite')
  const store = tx.objectStore('entries')

  store.clear()

  for (const entry of entries) {
    store.add(entry)
  }

  await tx.complete
}

Cypress.Commands.add('setEntries', setEntries)
