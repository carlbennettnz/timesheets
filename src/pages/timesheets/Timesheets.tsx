import React, { useEffect, useState } from 'react'
import { DB } from 'idb'

import { NoTimesheets } from './NoTimesheets'
import { EntryList } from './EntryList'
import { Entry } from '../../types/Entry'
import useDatabase from '../../effects/useDatabase'
import { startOfMonth, endOfMonth, format } from 'date-fns'

export const Timesheets = () => {
  const db = useDatabase('timesheets')
  const timesheets = useTimesheets(db)

  return (
    <main>
      {!Array.isArray(timesheets) ? (
        <p>Loading…</p>
      ) : (
        <EntryList entries={timesheets} />
      )}

      <h4>To-do:</h4>

      <ol>
        <li style={{ textDecoration: 'line-through' }}>Display in grid</li>
        <li>Make editable</li>
        <li>Month/week selection</li>
        <li>Project selection</li>
        <li>API sync</li>
      </ol>
    </main>
  )
}

const useTimesheets = (db: DB | null) => {
  const [timesheets, setTimesheets] = useState(null as Entry[] | null)

  useEffect(() => {
    if (!db) return

    const inThisMonth = IDBKeyRange.bound(
      format(startOfMonth(new Date()), 'YYYY-MM-DD'),
      format(endOfMonth(new Date()), 'YYYY-MM-DD')
    )

    db.transaction('entries')
      .objectStore('entries')
      .index('day')
      .getAll(inThisMonth)
      .then((result: Entry[] | null) => {
        console.log({ result })
        setTimesheets(result || [])
      })
  }, [db])

  return timesheets
}
