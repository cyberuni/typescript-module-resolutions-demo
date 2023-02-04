
/** @type {import('webpack').Configuration} */
export default {
  mode: 'development',
  entry: './es2015/index.js',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    mainFields: ['module']
  }
}
