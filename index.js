const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;


// Connection URL
const uri = "mongodb+srv://Robin:***mydb***@cluster0.iygii.mongodb.net/Phtask?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const riderCollection = client.db("Phtask").collection("ridercollection");
  const learnerCollection = client.db("Phtask").collection("learnercollection");
  // perform actions on the collection object

  app.post('/riderCollection',(req, res) => {
    const data = req.body;
    riderCollection.insertOne(data, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result);
      }
    });
  });

  app.post('/learnerCollection',(req, res) => {
    const data = req.body;
    console.log(data);
    learnerCollection.insertOne(data, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result);
      }
    });

  });

  app.get('/riderCollectionall',(req, res) => {
    riderCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  app.delete('/deleteRider/:id',(req, res) => {
    const id = req.params.id;
    console.log(id);
    riderCollection.deleteOne({_id: ObjectId(id)}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.deletedCount>0);
      }
    });
  })

  app.get('/getrider/:email',(req, res) => {
    const email = req.params.email;
    console.log(email);
    riderCollection.find({email:email}).toArray((err, result) => {
      res.send(result);
    });
  })

  app.get('/', (req, res) => {
    res.send("Hey there,server is running at port 5000");
  });
});

app.listen(process.env.PORT || port)