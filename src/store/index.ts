import { observable, action } from 'mobx'

import { Entry } from '../types/Entry'

export class TimesheetsStore {
  @observable timesheets: Entry[] = []

  @action
  load() {
    setTimeout(() => {
      this.timesheets.push(
        {
          id: 1,
          date: new Date(2019, 0, 1),
          hours: 5.5,
          notes: 'worked on x...'
        },
        {
          id: 2,
          date: new Date(2019, 0, 2),
          hours: 4.5,
          notes: 'worked on y...'
        }
      )
    }, 500)
  }
}
