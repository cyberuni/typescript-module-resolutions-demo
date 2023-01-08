import test from 'ava'
import { default as m } from 'cjs'

test('cjs default as', t => {
  t.notThrows(() => m.default(1))
})
