const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.publish('vertgrid/ESP/LED1');
  client.publish('vertgrid/ESP/LED2');
  client.subscribe("vertgrid/esp/temperature",(e)=>{
    e? console.log(e):"";
  });
  client.subscribe("vertgrid/esp/humidity",(e)=>{
    e? console.log(e):'';
  })
  client.subscribe('vertgrid/presence', function (err) {
    if (!err) {
      client.publish('vertgrid/presence', 'Hello mqtt')
    }
  })
  client.subscribe("vertgrid/testData", (e)=>{
    e?console.log(e):"";
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