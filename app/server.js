const express = require('express');
const app = express();
require('dotenv').config()
const db = require('./config/db')
const port = process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', require('./routes/users'))
app.use('/customers', require('./routes/customer'))

db
  .authenticate()
  .then(function(err) {
    console.log('Connection to MYSQL has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  
app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`)
})

app.get('/', (request, response) => {
    response.send('Home')
})

