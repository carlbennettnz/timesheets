import React from 'react'
import { eachDay, startOfMonth, endOfMonth, format } from 'date-fns'

import { Entry } from '../../../types/Entry'
import { EntryRow } from './EntryRow'
import { Direction } from '../types/Direction'

type EntryListProps = {
  entries: Entry[]
}

export const EntryList = ({ entries }: EntryListProps) => {
  const days = eachDay(startOfMonth(new Date()), endOfMonth(new Date())).map(
    day => format(day, 'YYYY-MM-DD')
  )

  const rows = days.map(day => (
    <EntryRow
      key={day}
      day={day}
      entry={entries.find(e => e.day === day)}
      move={handleSelectionMove}
    />
  ))

  return (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          <th className="p-2 border border-grey bg-grey-light">Day</th>
          <th className="p-2 border border-grey bg-grey-light">Hours</th>
          <th className="p-2 border border-grey bg-grey-light">Notes</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

const handleSelectionMove = (dir: Direction) => {
  const selection = document.getSelection()

  if (!selection) return

  let inputToFocus: HTMLInputElement | null

  try {
    const node = selection.focusNode as ChildNode
    inputToFocus =
      (dir === Direction.UP && getInputUp(node)) ||
      (dir === Direction.RIGHT && getInputRight(node)) ||
      (dir === Direction.DOWN && getInputDown(node)) ||
      (dir === Direction.LEFT && getInputLeft(node)) ||
      null
  } catch (err) {
    return
  }

  if (inputToFocus) {
    inputToFocus.focus()
  }
}

const getInputUp = (initial: ChildNode): HTMLInputElement | null => {
  const index = Array.from(initial.parentNode!.childNodes).indexOf(initial)
  const newNode = initial.parentNode!.previousSibling!.childNodes[index]
    .firstChild
  return newNode instanceof HTMLInputElement ? newNode : null
}

const getInputRight = (initial: ChildNode): HTMLInputElement | null => {
  const newNode = initial.nextSibling!.firstChild
  return newNode instanceof HTMLInputElement ? newNode : null
}

const getInputDown = (initial: ChildNode): HTMLInputElement | null => {
  const index = Array.from(initial.parentNode!.childNodes).indexOf(initial)
  const newNode = initial.parentNode!.nextSibling!.childNodes[index].firstChild
  return newNode instanceof HTMLInputElement ? newNode : null
}

const getInputLeft = (initial: ChildNode): HTMLInputElement | null => {
  const newNode = initial.previousSibling!.firstChild
  return newNode instanceof HTMLInputElement ? newNode : null
}
