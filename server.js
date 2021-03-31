const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const db = require("./models/workout");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/htmlroutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`HOLY COW YOU DID IT! ${PORT} BEING USED`);
})

//api routes
//workout schema finished
//db running