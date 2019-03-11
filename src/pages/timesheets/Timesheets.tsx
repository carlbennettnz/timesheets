import React, { useEffect, useState } from 'react'
import { DB } from 'idb'
import { startOfMonth, endOfMonth, format } from 'date-fns'

import { EntryList } from './components/EntryList'
import { Entry } from '../../types/Entry'
import useDatabase from '../../effects/useDatabase'

export const Timesheets = () => {
  const db = useDatabase('timesheets')
  const timesheets = useTimesheets(db)

  return (
    <main>
      <EntryList entries={timesheets} />

      <div className="p-4">
        <h4 className="mb-2">To-do:</h4>

        <ol>
          <li style={{ textDecoration: 'line-through' }}>Display in grid</li>
          <li>Make editable</li>
          <li>Month/week selection</li>
          <li>Project selection</li>
          <li>API sync</li>
        </ol>
      </div>
    </main>
  )
}

const useTimesheets = (db: DB | null) => {
  const [timesheets, setTimesheets] = useState([] as Entry[])

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
      .then((result: Entry[] | null) => setTimesheets(result || []))
  }, [db])

  return timesheets
}
