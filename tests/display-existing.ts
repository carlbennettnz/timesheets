import { Selector } from 'testcafe'

fixture('Display existing').page(`${process.env.STAGING_SERVER}/`)

test('Show no existing timesheets', async t => {
  await t.expect(Selector('tr').count).eql(0)
  await t.expect(Selector('p').innerText).eql(`There aren't any timesheet entries to display yet`)
})
