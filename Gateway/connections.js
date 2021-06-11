const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:9092']
})

const admin = kafka.admin()

const kafkacAdminConfig = async () => {
  try {
    let status = await admin.createTopics({
          /* topics-partitions */
            topics: [{
              topic: 'dilsha',
              numPartitions: 2,  
              replicationFactor : 1   
            }]
    });
    if(status === true){
      console.log('topic create success')
    }
    await admin.setOffsets({
          groupId: 'test-group',
          topic: 'dilsha',
          partitions: 
            [
              {
                partition: 0,
                offset: 1000
              },{
                partition: 1,
                offset: 1000
              },
              {
                partition: 2,
                offset: 1000
              }
            ]
  });
  } catch (error) {
      console.log(error.message)
  }
}


const producer = kafka.producer()
const producer2 = kafka.producer()
// const consumer = kafka.consumer({groupId : 'new-group'})


const run = async () => {
  // Producing
  await producer.connect()
  await producer2.connect()
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'new-topic', fromBeginning: true })
  setInterval(async () => {
    console.log('Publishing...')
    await producer.send({
      topic: 'dilsha',
      messages: [
        // { key : 'key1', value: 'Hello KafkaJS user!', partition : 1 },
        // { key : 'key2', value: 'Hello KafkaJS user22!', partition : 0 }

        { value: JSON.stringify({name : 'kushani', age : 16}) },
        { value: 'Hello Dilsha' },
        { value: 'Hello Rukmal' }
      ],
    })
  }, 2000)

  setInterval(async () => {
    console.log('Publishing2...')
    await producer2.send({
      topic: 'dilsha',
      messages: [
        // { key : 'key1', value: 'Hello KafkaJS user!', partition : 1 },
        // { key : 'key2', value: 'Hello KafkaJS user22!', partition : 0 }

        { value: JSON.stringify({name : 'Dabare', age : 16}) },
        { value: 'Hello Hiruni' },
        { value: JSON.stringify({name : 'Madushan', age : 3636}) },
        { value: JSON.stringify({name : 'Dabare', age : 16}) },
        { value: 'Hello Hiruni' },
        { value: JSON.stringify({name : 'Madushan', age : 55}) },
        { value: JSON.stringify({name : 'Dabare', age : 16}) },
        { value: 'Hello Hiruni' },
        { value: JSON.stringify({name : 'Madushan', age : 28}) }
      ],
    })
  }, 1000)


  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       partition,
  //       offset: message.offset,
  //       value: message.value.toString(),
  //     })
  //   },
  // })
  
}

kafkacAdminConfig()
  .then(() => {
    console.log('admin config done')
    return run()
  })
  .then(() => console.log('producing messages...'))
  .catch((error) => console.log(error.message))

