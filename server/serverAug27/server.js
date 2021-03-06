const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7000;

const { database } = require('./config');

mongoose.connect(database.url, database.deprecation).then(() => {
    console.log("successfully connect to database...");
}).catch(err => {
    console.log("could not connect to databse", err);
})

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to HQAH application." });
});

require('./app/routes')(app);
// require('./app/routes/reviews.route')(app);
// require('./app/routes/products.route')(app);
// require('./app/routes/categories.route')(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})