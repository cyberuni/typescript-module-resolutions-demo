import test from 'ava'
import { default as assertron } from 'assertron'

test('assertron default as', t => {
  t.notThrows(() => assertron.default.truthy(true))
})
