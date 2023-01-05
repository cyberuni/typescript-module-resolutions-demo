import assert from 'assert'
import useWebSocket from 'react-use-websocket'
import paramCase from 'param-case'

export default useWebSocket

assert(typeof useWebSocket === 'function')
assert(typeof paramCase === 'function')

console.log('success')
