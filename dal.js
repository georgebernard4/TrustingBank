const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// Connect to MongoDB
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
  console.log("Connected successfully to db server:");

  // Connect to myproject database
  db = client.db('myproject');
});

// Create user account
function create(name, email, password){
  return new Promise((resolve, reject) =>{
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 100};
    collection.insertOne(doc, {w:1}, function(err, result){
      err ? reject(err) : resolve(doc);
    });
  })
}

// All users
function all(){
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.find({}).toArray(function(err, docs){
      err ? reject(err) : resolve(docs);
    });
  })
}

// Find user by email
function findByEmail(email) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.find({email: email}).toArray(function(err, docs) {
      if (err) reject(err);
      else if (docs.length === 0) resolve([]);
      else resolve(docs);
    });
  });
}

// Update user balance
function updateBalance(email, balance) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('users');
    collection.updateOne({email: email}, {$set: {balance: balance}}, function(err, result) {
      console.log(err);
      console.log(result)
      err ? reject(err) : resolve(result);
    });
  });
}

module.exports = {create, all, findByEmail, updateBalance};

// The create function takes three parameters: name, email, and password.
// It creates a new document in the "users" collection of the "myproject" database with the provided name,
// email, password, and a default balance of 100.

// The findByEmail function takes one parameter: email. 
// It returns a Promise that resolves with the user document that matches the provided email
// or rejects with an error if no match is found or an error occurs.

// The all function returns a Promise that resolves with an array of all user documents
// in the "users" collection or rejects with an error if one occurs.

// The updateBalance function takes two parameters: email and newBalance.
// It updates the "balance" field of the user document that matches the provided email 
// with the provided newBalance and returns a Promise that resolves with the result
// or rejects with an error if one occurs.
