const express = require('express')
var bodyParser = require('body-parser')
let mongodb = require('mongodb')
const { updateStatus } = require('./utils/updateStatus')
const MongoClient = mongodb.MongoClient
var ObjectId = mongodb.ObjectID
const app = express()
const port = 3000

app.use(bodyParser.json())

const url = 'mongodb://localhost:27017'
const dbName = 'orders'

app.post('/customers/:customerId/orders/', (req, res) => {
  if (req.body.items.length === 0) {
    res.status(400).end()
  } else {
    MongoClient.connect(url, function (err, client) {
      if (err) {
        console.error(err)
      }
      const db = client.db(dbName)
      const collection = db.collection('orders')
      const order = req.body
      order.customerId = req.params.customerId
      collection.insertOne(order, function (err, result) {
        if (err) {
          console.error(err)
        }
        res.send(result.ops[0])
      })
      client.close()
    })
  }
})

app.put('/customers/:customerId/orders/:id/status', (req, res) => {
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.error(err)
    }
    const db = client.db(dbName)
    const collection = db.collection('orders')
    collection.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
      if (err) {
        console.error(err)
      }
      updateStatus(result, req.body.status)
      collection.update({ _id: ObjectId(req.params.id) }, result)
      res.send(result)
      client.close()
    })
  })
})

app.get('/customers/:customerId/orders/', (req, res) => {
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.error(err)
    }
    const db = client.db(dbName)
    const collection = db.collection('orders')
    collection.find({ customerId: req.params.customerId }).toArray((err, result) => {
      if (err) {
        console.error(err)
      }
      res.send(result)
    })

    client.close()
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
