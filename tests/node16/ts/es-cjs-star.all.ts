import test from 'ava'
import * as m from 'es-cjs'

test('es-cjs star', t => {
  t.notThrows(() => m.default.default(1))
})
