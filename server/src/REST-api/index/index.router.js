function Http() {
  this.configure = function (app) {
    app.get('/', (req, res) => {
      res.render('index', { title: 'REST-api' });
    });
  };
}

module.exports = new Http();
