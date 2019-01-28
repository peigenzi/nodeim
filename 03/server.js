const net = require('net')

const server = net.createServer()
const socketList = []

server.on('listening', e => {
  console.log('listening')
})

server.on('connection', socket => {
  console.log(socket)
  socketList.push(socket)
  // socket.write('hello')
  // socket.end()

  socket.on('error', err => {

  })

  socket.on('close', () => {

  })
})

server.on('error', e => {
  console.log('err', e)
})

server.on('close', e => {
  console.log('close', e)
})

server.listen(9999)

setInterval(() => {
  socketList.forEach(socket => {
    socket.write(JSON.stringify(new Date().toISOString()))
  })
}, 2000);