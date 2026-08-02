const Joi = require("joi");

const analysisResponseSchema = Joi.object({
  overallScore: Joi.number().required()
}).unknown(true);

module.exports = {
  analysisResponseSchema
};