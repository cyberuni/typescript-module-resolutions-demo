import test from 'ava'
import * as paramCase from 'param-case'

test('* as paramCase', t => {
  t.notThrows(() => paramCase.default('hello world'))
})
