import test from 'ava'
import { default as paramCase } from 'param-case'

test('param-case default as', t => {
  t.notThrows(() => paramCase('hello world'))
})
