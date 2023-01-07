import test from 'ava'
import paramCase from 'param-case'

test('param-case default', t => {
  t.notThrows(() => paramCase('hello world'))
})
