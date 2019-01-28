// const io = require('socket.io')(9998) //server和io会占用两个端口
const path = require('path')
const express = require('express')
const http = require('http')
const SocketIo = require('socket.io')

let app = express()
app.use(express.static(path.resolve(__dirname, './public')))


let server = http.Server(app)
let io = new SocketIo(server, {
  pingTimeout: 1000 * 10,
  pingInterval: 1000 * 2,
  transports: ['websocket', 'polling'],
  allowUpgrades: true, //传输方式是否允许升级
  httpCompression: true,
  path: '/webim', //提供客户端js的路径
  serveClient: false, //是否提供客户端js
})

server.listen('9999', (err) => {
  if (err) {
    console.log(err)
  }
})