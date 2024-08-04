module.exports = app => {
    const user = require("../controllers/userController.js");

    var router = require("express").Router();

    router.post("/login", user.login);
    router.post("/insertPositionData", user.insertPositionData)
    router.post("/updateUserPositions", user.updateUserPositions)
    router.get("/getUserData", user.getUserData)
    router.get("/getPositionWiseData", user.getPositionWiseData)
    router.post("/getPattern", user.getPattern)
    router.get("/getPositionWiseDataApp", user.getPositionWiseDataApp)
    router.post("/truncateDb", user.truncateDb)
    
    app.use("/", router);
};