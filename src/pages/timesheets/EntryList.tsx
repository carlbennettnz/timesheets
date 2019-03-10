import React from 'react'
import { Entry } from '../../types/Entry'

export const EntryList = ({ entries }: { entries: Entry[] }) => (
  <table>
    <tbody>
      {entries.map(entry => (
        <EntryRow key={entry.id} {...entry} />
      ))}
    </tbody>
  </table>
)

const EntryRow = ({ date, hours, notes }: Entry) => (
  <tr>
    <td>{date.toDateString()}</td>
    <td>{hours}</td>
    <td>{notes}</td>
  </tr>
)
