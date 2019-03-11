import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'

import { Timesheets } from './pages/timesheets/Timesheets'

configure({
  enforceActions: 'observed'
})

const el = document.querySelector('#app')!

// @ts-ignore
render(<Timesheets />, el)
