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
    <table className="border-collapse w-full">
      <thead>
        <tr>
          <th className="p-2 border border-grey-light">Day</th>
          <th className="p-2 border border-grey-light">Hours</th>
          <th className="p-2 border border-grey-light">Notes</th>
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
  <tr className={!entry || !entry.hours ? 'text-grey' : ''}>
    <td className="p-2 w-32 border border-grey-light text-right">
      {format(day, 'D/MM/YYYY')}
    </td>
    <td className="p-2 w-32 border border-grey-light text-right">
      {formatHours(entry && entry.hours)}
    </td>
    <td className="p-2 border border-grey-light">{entry && entry.notes}</td>
  </tr>
)

const formatHours = (hours?: number) => {
  hours = Math.max(0, hours || 0)

  const hoursPart = Math.floor(hours)
  const minutesPart = Math.floor((hours % 1) * 60)
    .toString()
    .padStart(2, '0')

  return `${hoursPart}:${minutesPart}`
}
