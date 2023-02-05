const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('vertgrid/presence', function (err) {
    if (!err) {
      client.publish('vertgrid/presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("====================NEW MESSAGE =============");
  console.log(`TOPIC : ${topic}`);
  console.log("-------------------");
  console.log(message.toString())
  console.log("-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
  if(topic == "vertgrid/disconnect"){
    client.end()
  }

})