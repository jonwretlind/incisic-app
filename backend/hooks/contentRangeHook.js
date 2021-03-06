const UserData = require('../models/userdata');

module.exports = (request, reply, done) => {
  UserData.count({}, (err, count) => {
    if (err) {
      console.error(err);
      reply.code(500).send('Error!');
    }
    reply.header('Content-Range', `notes 0-10}/${count}`);
    done();
  });
};
