import test from 'ava'
import * as paramCase from 'param-case'

test('param-case star', t => {
  t.notThrows(() => paramCase.default('hello world'))
})
