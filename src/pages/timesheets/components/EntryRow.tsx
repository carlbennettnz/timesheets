import React from 'react'
import { format } from 'date-fns'

import { Entry } from '../../../types/Entry'

type EntryRowProps = {
  day: string
  entry?: Entry
}

export const EntryRow = ({ day, entry }: EntryRowProps) => {
  const baseStyles = 'border border-grey-light text-right bg-grey-lighter'
  const styles = [baseStyles, !entry || !entry.hours ? 'text-grey' : ''].join(
    ' '
  )

  return (
    <tr>
      <td className={`${styles} p-2 w-32 text-right bg-grey-lighter`}>
        {format(day, 'D/MM/YYYY')}
      </td>
      <td className={`${styles} w-32`}>
        <input
          readOnly
          className="p-2 w-full"
          value={formatHours(entry && entry.hours)}
        />
      </td>
      <td className={styles}>
        <input readOnly className="p-2 w-full" value={entry && entry.notes} />
      </td>
    </tr>
  )
}

const formatHours = (hours?: number) => {
  hours = Math.max(0, hours || 0)

  const hoursPart = Math.floor(hours)
  const minutesPart = Math.floor((hours % 1) * 60)
    .toString()
    .padStart(2, '0')

  return `${hoursPart}:${minutesPart}`
}
