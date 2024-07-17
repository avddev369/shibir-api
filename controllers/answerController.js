const jwt = require('jsonwebtoken');
const db = require("../models");
const myRes = require("../utils/responseHandler");


exports.insertAnswer = async (req, res) => {
    const { userId, queId, answer: answerText, opId } = req.body;

    try {
        if (!userId || !queId || !answerText) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newAnswer = await db.answer.create({
            userId,
            queId,
            answer: answerText,
            opId,
        });

        res.status(201).json(newAnswer);
    } catch (error) {
        console.error('Error inserting answer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
