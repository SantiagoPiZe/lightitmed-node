const controller = require("../controllers/user.controller");

module.exports = function(app) {
  const bp = require('body-parser');
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: true }));

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/info", controller.userInfo);
};