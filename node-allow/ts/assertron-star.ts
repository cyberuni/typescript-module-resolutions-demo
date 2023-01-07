import test from 'ava'
import * as assertron from 'assertron'

test('* as assertron', t => {
  t.notThrows(() => assertron.default.truthy(true))
})
