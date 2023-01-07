import test from 'ava'
import { default as assert } from 'assert'

test('assert default as', t => {
  t.notThrows(() => assert(true))
})
