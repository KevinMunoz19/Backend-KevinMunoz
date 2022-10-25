const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

const db = require('./app/models');

db.sequelize.sync();

app.get('/', (request, response) => {
  response.send('Hi there');
});

require('./app/routes/tutorial.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/account.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
