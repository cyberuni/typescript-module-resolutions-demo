import test from 'ava'
import m from 'esm'

test('esm default', t => {
  t.notThrows(() => m(1))
})
