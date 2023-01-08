import test from 'ava'
import * as assert from 'assert'

test('assert star', t => {
  t.notThrows(() => assert.default(true))
})
