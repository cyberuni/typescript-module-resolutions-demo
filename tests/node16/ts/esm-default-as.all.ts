import test from 'ava'
import { default as m } from 'esm'

test('esm default as', t => {
  t.notThrows(() => m(1))
})
