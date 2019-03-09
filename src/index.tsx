import React from 'react'
import { render } from 'react-dom'

import { Root } from './pages/root/Root'

const el = document.querySelector('#app')!

// @ts-ignore
render(<Root />, el)
