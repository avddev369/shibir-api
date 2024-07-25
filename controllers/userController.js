const jwt = require('jsonwebtoken');
const db = require("../models");
const myRes = require("../utils/responseHandler");


// Change according to use, as it's configured not according to user table
exports.registerUser = (req, res) => {
    if (params.verifyParam(req, res) === true) {
        const tokenPayload = {
            id: 1,
        };
        const token = jwt.generateToken(tokenPayload);
        const refreshToken = jwt.generateRefreshToken(tokenPayload);


        db.user.create({
            username: req.body['user_token'],
            email: req.body['email'],
            phone: req.body['phone'],
            password: req.body['password'],
            // user_token: req.body['user_token'],  //for firebase
            // fcm_token: req.body['fcm_token'],    //for firebase
            // login_type: req.body['login_type'],  //for firebase
            // status: req.body['status'],
        }).then(user => {
            db.privacy.create({
                uid: user.user_id,
                pid: 0
            }).then(() => {
                myRes.successResponse(res, { msg: user, token: token, refreshToken: refreshToken });
            }).catch(error => {
                myRes.errorResponse(res, error.message);
            });

        }).catch(error => {
            console.log(error);
            myRes.errorResponse(res, error.message);
        });

    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.user.findOne({
            where: { username, password },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        myRes.successResponse(res, {
            id: user.id,
            name: user.name,
            isMaster: user.isMaster,
            mobile: user.mobile,
            type_id: user.type_id,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.insertPositionData = async (req, res) => {
    // if (params.verifyParam(req, res) === true) {
    try {

        const existingPosition = await db.yuvakPostions.findOne({
            where: { deviceId: req.body['deviceId'] }
        });

        if (existingPosition) {

            await existingPosition.update({
                top: req.body['top'],
                bottom: req.body['bottom'],
                left: req.body['left'],
                right: req.body['right'],
            });

            myRes.successResponse(res, existingPosition);
        } else {
            const newPosition = await db.yuvakPostions.create({
                deviceId: req.body['deviceId'],
                top: req.body['top'],
                bottom: req.body['bottom'],
                left: req.body['left'],
                right: req.body['right'],
            });
            myRes.successResponse(res, newPosition);
        }
    } catch (error) {
        console.log(error);
        myRes.errorResponse(res, error.message);
    }
    // }
};

exports.getUserData = async (req, res) => {
    try {
        const positions = await db.yuvakPostions.findAll();

        const formattedData = positions.reduce((acc, position) => {
            acc[position.userId] = {
                top: position.top,
                right: position.right,
                bottom: position.bottom,
                left: position.left
            };
            return acc;
        }, {});

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching positions:', error);
        res.status(500).json({ error: 'An error occurred while fetching positions.' });
    }
};