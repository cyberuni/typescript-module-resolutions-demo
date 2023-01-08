import test from 'ava'
import * as m from 'esm-cjs'

test('esm-cjs star', t => {
  t.notThrows(() => m.default(1))
})
