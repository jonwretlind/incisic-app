const SchillerDataController = require('../controllers/schillerDataController');

module.exports = (app) => {
  console.log("✅ Schiller routes loaded");

  app.get('/api/all', SchillerDataController.fetch);

  app.post('/api/schiller', SchillerDataController.create);
  app.get('/api/schiller', SchillerDataController.fetch);

  app.get('/api/schiller/:id', SchillerDataController.get);
  app.put('/api/schiller/:id', SchillerDataController.update);
  app.delete('/api/schiller/:id', SchillerDataController.delete);
};
