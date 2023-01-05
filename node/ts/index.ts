import * as assert from 'assert'
import useWebSocket from 'react-use-websocket'
// does not work with `export =` without `esModuleInterop`
// import paramCase from 'param-case'

export default useWebSocket

assert(typeof useWebSocket === 'function')
// assert(typeof paramCase === 'function')

console.log('success')
