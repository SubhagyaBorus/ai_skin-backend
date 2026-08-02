require("dotenv").config();

console.log("API KEY:", process.env.OPENROUTER_API_KEY?.substring(0, 15));
console.log("MODEL FROM ENV:", process.env.OPENROUTER_MODEL);

module.exports = {
  apiKey: process.env.OPENROUTER_API_KEY,
  model: process.env.OPENROUTER_MODEL,
  baseUrl: "https://openrouter.ai/api/v1/chat/completions",
};