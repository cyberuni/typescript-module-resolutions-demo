import test from 'ava'
import assert from 'assert'

test('assert default', t => {
  t.notThrows(() => assert(true))
})
