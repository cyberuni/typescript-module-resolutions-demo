import test from 'ava'
import assertron from 'assertron'

test('assertron', t => {
  t.notThrows(() => assertron.default.truthy(true))
})
