import React from 'react'
import { format } from 'date-fns'

import { Entry } from '../../../types/Entry'
import { DurationInput } from './DurationInput'
import { Direction } from '../types/Direction'

type EntryRowProps = {
  day: string
  entry?: Entry
  move: (dir: Direction) => void
}

export const EntryRow = ({ day, entry, move }: EntryRowProps) => {
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
        <DurationInput
          className="p-2 w-full"
          move={move}
          hours={entry && entry.hours}
        />
      </td>
      <td className={styles}>
        <input readOnly className="p-2 w-full" value="" />
      </td>
    </tr>
  )
}
