import test from 'ava'
import assertron from 'assertron'

test('assertron default', t => {
  t.notThrows(() => assertron.default.truthy(true))
})
