import test from 'ava'
import assertron from 'assertron'

test('assertron default', t => {
  t.notThrows(() => assertron.truthy(true))
})
