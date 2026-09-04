const axios = require("axios");
const config = require("../config/openrouter");

const ANALYSIS_PROMPT = `You are an expert AI dermatologist, skincare specialist, cosmetic scientist, nutritionist, and wellness consultant.

Analyze ONLY the visible facial skin in the uploaded image.

IMPORTANT

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT explain anything outside JSON.
- Every score must be an integer between 0 and 100.
- Base your analysis ONLY on visible evidence.
- Never invent skin conditions that cannot be seen.
- If something cannot be determined from the image, say "Unknown".
- Be realistic and consistent.
- Do not always return high scores.
- Do not recommend prescription medicines.
- Recommend only over-the-counter skincare.

SCORING GUIDE

100 = Excellent
90 = Very Good
80 = Good
70 = Mild concern
60 = Moderate concern
50 = Noticeable concern
40 = Poor
30 = Significant issue
20 = Severe issue

Evaluate these visible attributes:

- Texture
- Hydration
- Acne
- Wrinkles
- Dark Circles
- Pores
- Pigmentation
- Oiliness
- Sensitivity (estimate only if redness is visible)

Calculate:

overallScore = average of all individual scores.

Determine:

- skinType
- skinTone

Before returning the JSON:

1. Check that all scores are realistic.
2. Make sure overallScore is the mathematical average.
3. Ensure recommendations match the detected skin type.
4. Mention only visible concerns.
5. Do not contradict yourself.

For foods, lifestyle, exercise and skincare, provide general healthy recommendations related to the detected skin concerns.

Recommended products should be:
- internationally available
- dermatologist recommended
- suitable for the detected skin type
- non-prescription

Return ONLY this JSON.

{
  "analysisVersion":"2.0",

  "confidence":0,

  "faceDetected":true,

  "imageQuality":{
    "lighting":"",
    "sharpness":"",
    "visibility":""
  },

  "overallScore":0,

  "skinType":"",

  "skinTone":"",

  "scores":{
    "texture":0,
    "hydration":0,
    "acne":0,
    "wrinkles":0,
    "darkCircles":0,
    "pores":0,
    "pigmentation":0,
    "oiliness":0,
    "sensitivity":0
  },

  "summary":"",

  "mainIssue":"",

  "severity":"Low",

  "visibleFindings":[
    ""
  ],

  "analysisLimitations":[
    ""
  ],

  "concerns":[
    {
      "name":"",
      "severity":"",
      "score":0,
      "reason":""
    }
  ],

  "strengths":[
    {
      "name":"",
      "score":0
    }
  ],

  "recommendations":{
    "cleanser":"",
    "serum":"",
    "moisturizer":"",
    "sunscreen":"",
    "nightCream":""
  },

  "recommendedIngredients":[
    {
      "name":"",
      "benefit":""
    }
  ],

  "avoidIngredients":[
    ""
  ],

  "recommendedProducts":[
    {
      "category":"",
      "name":"",
      "reason":""
    }
  ],

  "foodsToEat":[
    ""
  ],

  "foodsToAvoid":[
    ""
  ],

  "dietPlan":{
    "breakfast":"",
    "morningSnack":"",
    "lunch":"",
    "eveningSnack":"",
    "dinner":"",
    "waterIntake":"",
    "supplements":""
  },

  "exercisePlan":{
    "workoutType":"",
    "duration":"",
    "weeklyFrequency":"",
    "exercises":[]
  },

  "dailyRoutine":{
    "morning":[],
    "afternoon":[],
    "night":[]
  },

  "lifestyle":{
    "sleep":"",
    "stress":"",
    "screenTime":"",
    "waterGoal":"",
    "sunExposure":"",
    "tips":[]
  },

  "weeklyGoals":[
    ""
  ]
}
`;

async function analyseWithOpenRouter(base64Image) {
  try {
    // Convert image to Base64
 //   const base64Image = await imageToBase64FromUrl(imageUrl);

     console.log("=================================");
  console.log("Model:", config.model);
  console.log("Image Base64 Length:", base64Image.length);
  console.log("=================================");

  const requestBody = {
    model: config.model,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
          {
            type: "text",
            text: ANALYSIS_PROMPT,
          },
        ],
      },
    ],
    temperature: 0.2,
    max_tokens: 4000,
  };
    const response = await axios.post(
      config.baseUrl,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
         
        },
        timeout: 120000,
      }
    );

    console.log("========== OPENROUTER RESPONSE ==========");
    console.dir(response.data, { depth: null });
    console.log("=========================================");

    if (
      !response.data ||
      !response.data.choices ||
      response.data.choices.length === 0
    ) {
      throw new Error("No choices returned by OpenRouter");
    }

    let content = response.data.choices[0].message.content;

    // Some models return an array instead of a string
    if (Array.isArray(content)) {
      content = content
        .map((item) => item.text || "")
        .join("");
    }

    if (!content) {
      throw new Error("Empty AI response");
    }

    // Remove markdown
    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("========== AI TEXT ==========");
    console.log(content);
    console.log("=============================");

    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("JSON not found in AI response");
    }

    const jsonString = content.substring(start, end + 1);

    return JSON.parse(jsonString);
  } catch (err) {
    console.log("========== OPENROUTER ERROR ==========");

    if (err.response) {
      console.dir(err.response.data, { depth: null });
    } else {
      console.error(err);
    }

    console.log("======================================");

    throw err;
  }
}

module.exports = {
  analyseWithOpenRouter,
};
