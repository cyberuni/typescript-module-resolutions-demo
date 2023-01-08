import test from 'ava'
import { default as m } from 'es-cjs'

test('es-cjs default as', t => {
  t.notThrows(() => m.default(1))
})
