const { analyseWithOpenRouter } = require("../services/openrouter.service");
const { getFallbackAnalysis } = require("../services/score.service");
const { analysisResponseSchema } = require("../validators/response.schema");
const logger = require("../utils/logger");

async function analyzeSkin(req, res) {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        error: "imageBase64 is required",
      });
    }

    // ==============================
    // CALL OPENROUTER
    // ==============================
    let aiResult;

    try {
      aiResult = await analyseWithOpenRouter(imageBase64);
    } catch (err) {
      console.log("\n========== OPENROUTER ERROR ==========");

      if (err.response) {
        console.dir(err.response.data, { depth: null });
      } else {
        console.error(err);
      }

      console.log("======================================\n");

      return res.status(500).json({
        success: false,
        message: "OpenRouter request failed",
        error: err.message,
        details: err.response?.data || null,
      });
    }

    // ==============================
    // VALIDATE RESPONSE
    // ==============================
    const { error, value } = analysisResponseSchema.validate(aiResult, {
      abortEarly: false,
    });

    if (error) {
      console.log("\n========== VALIDATION ERROR ==========");
      console.dir(error.details, { depth: null });
      console.log("======================================\n");

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        validation: error.details,
        aiResponse: aiResult,
      });
    }

    // ==============================
    // SUCCESS
    // ==============================
    value.source = "openrouter";
    value.timestamp = new Date().toISOString();

    return res.json(value);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

module.exports = {
  analyzeSkin,
};