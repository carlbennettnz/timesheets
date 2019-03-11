import React from 'react'
import { eachDay, startOfMonth, endOfMonth, format } from 'date-fns'

import { Entry } from '../../../types/Entry'
import { EntryRow } from './EntryRow'

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
