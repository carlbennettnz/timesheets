import { useState, useEffect } from 'react'
import { openDb, DB, UpgradeDB } from 'idb'

const rand = Math.random()

export default (name: string, version = 1) => {
  const [database, setDatabase] = useState(null as DB | null)

  useEffect(() => {
    openDb(name, version, updateSchema).then(setDatabase)
  }, [name])

  return database
}

export const updateSchema = (db: UpgradeDB) => {
  switch (db.oldVersion) {
    case 0:
      const entries = db.createObjectStore('entries', {
        keyPath: 'id',
        autoIncrement: true
      })

      entries.createIndex('day', 'day', { unique: false })
  }
}
