import test from 'ava'
import * as assert from 'assert'

test('* as assert', t => {
  t.notThrows(() => assert(true))
})
