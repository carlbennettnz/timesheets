import { useState, useEffect } from 'react'
import { openDb, DB, UpgradeDB } from 'idb'

const rand = Math.random()

export default (name: string, version = 1) => {
  const [database, setDatabase] = useState(null as DB | null)

  useEffect(() => {
    console.log('running db open effect', name, version)

    openDb(name, version, updateSchema).then(db => {
      console.log('opened the db', db)
      setDatabase(db)
    })
  }, [name])

  return database
}

export const updateSchema = (db: UpgradeDB) => {
  console.log('running update schema')

  switch (db.oldVersion) {
    case 0:
      const entries = db.createObjectStore('entries', {
        keyPath: 'id',
        autoIncrement: true
      })

      entries.createIndex('date', 'date', { unique: false })
  }
}
