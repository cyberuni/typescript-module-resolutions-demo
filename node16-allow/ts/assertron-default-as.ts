import test from 'ava'
import { default as assertron } from 'assertron'

test('default as assertron', t => {
  t.notThrows(() => assertron.truthy(true))
})
