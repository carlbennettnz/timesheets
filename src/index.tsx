import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'

import { TimesheetsStore } from './store'
import { Timesheets } from './pages/timesheets/Timesheets'

configure({
  enforceActions: 'observed'
})

const el = document.querySelector('#app')!
const store = new TimesheetsStore()

// @ts-ignore
render(<Timesheets store={store} />, el)
