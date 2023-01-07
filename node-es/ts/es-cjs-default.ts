import test from 'ava'
import m from 'es-cjs'

test('es-cjs default', t => {
  t.notThrows(() => m(1))
})
