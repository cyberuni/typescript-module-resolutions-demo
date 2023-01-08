import test from 'ava'
import { default as m } from 'esm-cjs'

test('esm-cjs default as', t => {
  t.notThrows(() => m(1))
})
