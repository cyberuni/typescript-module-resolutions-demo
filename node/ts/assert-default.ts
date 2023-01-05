import test from 'ava'
import assert from 'assert'

test('assert', t => {
  t.notThrows(() => assert(true))
})
