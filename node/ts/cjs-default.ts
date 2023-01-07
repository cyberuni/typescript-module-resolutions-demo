import test from 'ava'
import m from 'cjs'

test('cjs default', t => {
  t.notThrows(() => m(1))
})
