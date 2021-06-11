const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
 
  // Consuming
  await consumer.connect()
  console.log('connection done')
  await consumer.subscribe({ topic: 'dilsha' })
  console.log('subscription done')

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)