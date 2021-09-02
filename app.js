require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const data = require('./router/data');
const app = express();

const dbUsername = (process.env.DB_USERNAME);
const dbPassword = (process.env.DB_PASSWORD);
const dbName = (process.env.DB_DATABASE);
const appPort = (process.env.PORT);

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.uttnk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to mongo");
}).catch((err) => {
    console.log("Error: " + err);
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/", data);

app.listen(appPort || 8001, () => {
  console.log('Listening at: ' + appPort);
});
