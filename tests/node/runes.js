const { VirtualConsole, JSDOM } = require('jsdom')

const virtualConsole = new VirtualConsole()
virtualConsole.sendTo(console)

JSDOM.fromFile('index.html', {
  runScripts: 'dangerously',
  resources: 'usable',
  virtualConsole
})
