import test from 'ava'
import paramCase from 'param-case'

test('paramCase', t => {
  t.notThrows(() => paramCase('hello world'))
})
