function Http() {
  this.configure = function (app) {
    app.get('/', (req, res) => {
      res.render('index', { title: 'App 1' });
    });
  };
}

module.exports = new Http();
