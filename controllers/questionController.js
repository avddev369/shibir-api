const jwt = require('jsonwebtoken');
const db = require("../models");
const myRes = require("../utils/responseHandler");


exports.getQuestionWithOption = async (req, res) => {
    const { ssId } = req.body;

    try {
        const questionWithOptions = await db.question.findAll({
            where: { ssId: ssId },
            include: [
                {
                    model: db.option,
                    as: 'question',
                },
            ],
        });

        const formattedResponse = questionWithOptions.map(question => ({
            queId: question.queId,
            type: question.queType,
            options: question.question.map(option => ({
                opId: option.opId,
                title: option.option, 
            })),
        }));

        myRes.successResponse(res, formattedResponse);
    } catch (error) {
        myRes.errorResponse(res, error.message);
    }
};
