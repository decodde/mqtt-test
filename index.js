const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://18.212.78.64')

client.on('connect', function () {
  
  setInterval(()=>{
    client.publish('vertgrid/ESP/LED1',"true");
    client.publish('vertgrid/ESP/LED2',"false");
    client.publish('vertgrid/testArray',"90,909,true,false");
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
  client.subscribe("vertgrid/esp/allData", (e)=>{
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
  if(topic === "vertgrid/esp/allData"){
    let _m = message.toString().split(",");
    let temperature = _m[0];
    let humidity = _m[1];
    console.log("<<<<<<<<<<>>>>>>>>")
    console.log("Temperature : ", temperature);
    console.log("Humidity : ", humidity);
    console.log("<<<<<<<<<<>>>>>>>>")
    
  }

})