const express = require("express");
const cors = require("cors");

const app = express();

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/symptoms.routes')(app);
require('./app/routes/diagnosis.routes')(app);

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
