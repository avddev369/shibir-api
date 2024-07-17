module.exports = app => {
    const question = require("../controllers/questionController.js");

    var router = require("express").Router();

    router.post("/getQuestionWithOption", question.getQuestionWithOption);
    
    app.use("/", router);
};
      