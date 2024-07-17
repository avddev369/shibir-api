module.exports = app => {
    const answer = require("../controllers/answerController.js");

    var router = require("express").Router();

    router.post("/insertAnswer", answer.insertAnswer);
    
    app.use("/", router);
};
      