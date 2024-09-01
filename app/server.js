let express = require('express');
let path = require('path');
let fs = require('fs');
let {MongoClient} = require('mongodb');
let bodyParser = require('body-parser');
let app = express();

// Middleware to parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({
  extended: true
}));
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to serve the main HTML file
app.get('/', function (req, res) {
 
    res.sendFile(path.join(__dirname, "index.html"));
  });

// Route to serve the profile picture
app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// MongoDB connection URL for local use
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let databaseName = "user-account";
const client = new MongoClient(mongoUrlLocal);

// Immediately Invoked Function Expression to connect to MongoDB and fetch a sample document
(async function() {
  try {
      console.log('Attempting to connect to MongoDB...');
      await client.connect();
      console.log('Connected to MongoDB successfully!');

      const db = client.db(databaseName); // Replace with your actual database name
      const collection = db.collection('users');
      const doc = await collection.findOne({userid:1});
      console.log('Sample document:', doc);

  } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
  } finally {
      await client.close();
      console.log('Connection closed.');
  }
})();

// Route to get a user profile from the database
app.get('/get-profile', async function (req, res) {
  try {
      console.log("Attempting to connect to MongoDB...");
      // Ensure the connection is established
      await client.connect();
      console.log('Connected to MongoDB successfully!');
      
      const db = client.db(databaseName);
      const collection = db.collection('users');
      
      // Fetch the document
      const doc = await collection.findOne({ userid: 1 });
      
      // Send the response as JSON
      res.json(doc ? doc : {});

  } catch (err) {
      console.error('Error fetching profile from MongoDB:', err);
      res.status(500).send('Error fetching profile from MongoDB');
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
});

// Route to update a user profile in the database
app.post('/update-profile', async function (req, res) {
  try {
    console.log("Attempting to connect to MongoDB...");

    let userObj = req.body;
    await client.connect();
    const db = client.db(databaseName);
    userObj['userid'] = 1;
    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };
    const collection = db.collection('users');

    const result =  await collection.updateOne(myquery, newvalues, { upsert: true });
    if (result.upsertedCount > 0) {
        console.log('Document inserted with _id:', result.upsertedId._id);
    } else if (result.modifiedCount > 0) {
        console.log('Document updated');
    } else {
        console.log('No changes made to the document');
    }

    // Send response
    res.send(userObj);

  } catch (err) {
    console.error('Error fetching profile from MongoDB:', err);
    res.status(500).send('Error fetching profile from MongoDB');
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
});

// Start the server on port 8880
app.listen(8880, function () {
  console.log("app listening on port 8880!");
});
