const net = require('net')

const socketList = new Set()

const server = net.createServer()

server.on('connection', socket => {
  socketList.add(socket)

  // 客户端发消息
  socket.on('data', data => {
    socketList.forEach(client => {
      if (socket !== client) {
        client.write(data)
      }
    })
  })

  socket.on('close', hasErr => {
    socketList.delete(socket)
    console.log(`client out, 当前数量${socketList.size}`)
  })
})

server.listen(9999)