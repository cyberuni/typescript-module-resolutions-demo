import test from 'ava'
import * as m from 'cjs'

test('cjs star', t => {
  t.notThrows(() => m.default(1))
})
