function Http() {
  this.configure = function (app) {
    app.get('/', (req, res) => {
      res.render('index', { title: 'Review REST-api' });
    });
  };
}

module.exports = new Http();
