const net = require('net')
const repl = require('repl')

let client = null
let nickName = null

function connectServer() {
  const client = net.connect({
    port: 9999
  })

  client.on('connect', () => {
    console.log(`连接成功`)
  })

  client.on('data', data => {
    console.log(JSON.parse(data.toString()))
  })

  client.on('close', (hasErr) => {
    process.end()
  })

  return client
}

console.log('input nickname')
const replIns = repl.start({
  eval: (cmd, ctx, filename, cb) => {
    cmd = cmd.replace('\n', '')
    if (!nickName) {
      nickName = cmd
      console.log(`开始连接服务器`)
      client = connectServer()
      return
    }

    if (cmd === 'exit') {
      client.end()
    }

    let data = JSON.stringify({
      nickName: nickName,
      message: cmd
    })

    client.write(data)
    cb(null, cmd)
  }
})

// const client = net.connect({
// port: 9999
// })
// 
// client.on('connect', () => {
// 
// })
// 
// client.on('data', data => {
// console.log(JSON.parse(data.toString()))
// })
// 
// let data = JSON.stringify({
// nickName: 'n1',
// message: 'h1'
// })

// client.write(data)