import test from 'ava'
import * as paramCase from 'param-case'

test('* as paramCase', t => {
  t.notThrows(() => paramCase('hello world'))
})
