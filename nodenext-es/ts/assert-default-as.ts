import test from 'ava'
import { default as assert } from 'assert'

test('default as assert', t => {
  t.notThrows(() => assert(true))
})
