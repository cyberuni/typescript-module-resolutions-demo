import test from 'ava'
import { default as paramCase } from 'param-case'

test('default as paramCase', t => {
  t.notThrows(() => paramCase('hello world'))
})
