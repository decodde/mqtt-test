const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
  
  setInterval(()=>{
    client.publish('vertgrid/ESP/LED1',"false");
    client.publish('vertgrid/ESP/LED2',"true");
  },2000)
 
  
  client.subscribe("vertgrid/esp/temperature",(e)=>{
    e? console.log(e):"";
  });
  client.subscribe("vertgrid/esp/humidity",(e)=>{
    e? console.log(e):'';
  })
  client.subscribe('vertgrid/ESP/LED1', function (err) {
    if (!err) {
      
    }
  })
  client.subscribe("vertgrid/ESP/LED2", (e)=>{
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