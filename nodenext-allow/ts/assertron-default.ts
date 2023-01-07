import test from 'ava'
import assertron from 'assertron'

test('assertron', t => {
  t.notThrows(() => assertron.truthy(true))
})
