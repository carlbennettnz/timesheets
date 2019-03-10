import React from 'react'
import { eachDay, startOfMonth, endOfMonth, format } from 'date-fns'

import { Entry } from '../../types/Entry'

type EntryListProps = {
  entries: Entry[]
}

export const EntryList = ({ entries }: EntryListProps) => {
  const days = eachDay(startOfMonth(new Date()), endOfMonth(new Date())).map(
    day => format(day, 'YYYY-MM-DD')
  )

  const rows = days.map(day => (
    <EntryRow key={day} day={day} entry={entries.find(e => e.day === day)} />
  ))

  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hours</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

type EntryRowProps = {
  day: string
  entry?: Entry
}

const EntryRow = ({ day, entry }: EntryRowProps) => (
  <tr>
    <td>{format(day, 'D/MM/YYYY')}</td>
    <td>{entry && entry.hours}</td>
    <td>{entry && entry.notes}</td>
  </tr>
)
