import React, { useEffect, useState } from 'react'
import { startOfMonth } from 'date-fns'

import { NoTimesheets } from './NoTimesheets'
import { EntryList } from './EntryList'
import { Entry } from '../../types/Entry'
import useDatabase from '../../effects/useDatabase'

export const Timesheets = () => {
  const db = useDatabase('timesheets')
  const [timesheets, setTimesheets] = useState(null as Entry[] | null)

  useEffect(() => {
    console.log('db', db)
    if (!db) return

    db.transaction('entries')
      .objectStore('entries')
      .getAll()
      // .get(IDBKeyRange.lowerBound(startOfMonth(new Date())))
      .then(result => setTimesheets(result || []))
  }, [db])

  return (
    <main>
      <h1>Timesheets App</h1>

      {timesheets === null ? (
        <p>Loading…</p>
      ) : timesheets.length ? (
        <EntryList entries={timesheets} />
      ) : (
        <NoTimesheets />
      )}
    </main>
  )
}
