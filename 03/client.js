const net = require('net')

const client = net.connect({
  port: 9999
})

client.on('lookup', () => {
  console.log('lookup')
})

client.on('connect', () => {

})

client.on('data', data => {
  console.log(data.toString())
})

client.on('end', () => {
  console.log('server end')
})

client.on('timeout', () => {

})

client.on('drain', () => {

})

client.on('close', (hasErr) => {
  console.log('close', hasErr)
})

client.on('error', err => {
  console.log(err)
})