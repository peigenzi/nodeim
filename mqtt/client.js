const mqtt = require('mqtt')

let client = mqtt.connect('mqtt://localhost:7778')
let topic = 'sys/log/now'

client.on('connect', () => {
  console.log(`client connected`)

  client.subscribe('sys/log/now')
  client.publish(topic, Date.now().toString())
})

client.on('message', (topic, message) => {
  console.log(topic, message)
})

client.on('error', err => {
  console.log(err)
})