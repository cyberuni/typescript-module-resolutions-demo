import test from 'ava'
import m from 'esm-cjs'

test('esm-cjs default', t => {
  t.notThrows(() => m(1))
})
