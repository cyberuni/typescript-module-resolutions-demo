import test from 'ava'
import * as assertron from 'assertron'

test('assertron star', t => {
  t.notThrows(() => assertron.default.default.truthy(true))
})
