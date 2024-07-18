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

exports.getAnswer = async (req, res) => {
    try {
        const answers = await db.answer.findAll({
            include: [
                {
                    model: db.user,
                    attributes: ['userId', 'name'],
                    // as: "user" 
                },
                {
                    model: db.question,
                    attributes: ['queId', 'title', 'queType'], 
                },
                {
                    model: db.option,
                    attributes: ['opId', 'option'], 
                },
            ],
        });

        const formattedResponse = answers.map(ans => ({
            ansId: ans.ansId,
            userId: ans.user_master.userId,
            username: ans.user_master.name,
            queId: ans.que_master.queId,
            questionTitle: ans.que_master.title,
            questionType: ans.que_master.queType,
            answer: ans.answer,
            opId: ans.option_master.opId,
            option: ans.option_master.option,
        }));

        res.json(formattedResponse);
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};