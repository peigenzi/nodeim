const mosca = require('mosca')

let settings = {
  prot: 7777
}

settings = {
  http: {
    port: 7777,
    bundle: true
  }
}

let users = [{
  userId: 1,
  username: 'tom',
  password: 'pass',
  publishTopics: ['abc', 'abc/e'],
  subscribeTopics: ['abc', 'test']
}]

let userMap = new Map()

let authenticate = (client, username, password, cb) => {
  let user = users.find(x => x.username === username.toString() && x.password === password.toString())

  if (!user) {
    return cb('user not found', false)
  }

  userMap.set(client.id, {
    userId: users[0].userId,
    publishTopics: users[0].publishTopics,
    subscribeTopics: users[0].subscribeTopics
  })

  cb(null, true)
}

let authorizePublish = (client, topic, payload, cb) => {
  let user = userMap.get(client.id)
  console.log(user)
  if (!user) {
    return cb('user invalid', false)
  }

  if (user.publishTopics.indexOf(topic) < 0) {
    return cb(`can't public toopic:${topic}`)
  }

  cb(null, true)
}

let authorizeSubscribe = (client, topic, cb) => {
  let user = userMap.get(client.id)

  if (!user) {
    return cb('user invalid', false)
  }
  if (user.subscribeTopics.indexOf(topic) < 0) {
    return cb(`can't pub${topic}`)
  }

  cb(null, true)
}

let server = new mosca.Server(settings)

server.on('ready', () => {
  console.log('mq s')
  server.authenticate = authenticate
  // server.authorizePublish = authorizePublish
  // server.authorizeSubscribe = authorizeSubscribe
})

server.on('error', err => {
  console.log(err)
})

server.on('clientConnected', client => {
  console.log(`client id: ${client.id}`)
})

server.on('clientDisconnected', client => {

})

server.on('published', (packet, client) => {

})

server.on('subscribed', (topic, client) => {

})