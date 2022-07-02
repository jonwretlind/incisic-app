const fastify = require('fastify')({ logger: true });
const mongoose = require("mongoose");
const PORT = 4000;
const DB_URL = "mongodb://127.0.0.1:27017/incisic_app";
const userRoutes = require('./routes/user')
const userData = require("./models/userdata");
const contentRangeHook = require('./hooks/contentRangeHook');
const app = fastify;
app.register(require('fastify-cors'), {
  origin: 'http://localhost:3000',
});

try {
  mongoose.connect(DB_URL);
} catch (e) {
  console.error(e);
};

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.addHook('preHandler', contentRangeHook);
userRoutes(app, userData);

app.get('/', (req, res) => {
  res.send('Hello, this is the Incisic Backend Server at your service!');
})

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
