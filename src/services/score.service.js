function getFallbackAnalysis() {
  return {
    analysisVersion: "2.0",

    confidence: 0,

    faceDetected: false,

    imageQuality: {
      lighting: "Unknown",
      sharpness: "Unknown",
      visibility: "Unable to analyze",
    },

    overallScore: 0,

    skinType: "Unknown",
    skinTone: "Unknown",

    scores: {
      texture: 0,
      hydration: 0,
      acne: 0,
      wrinkles: 0,
      darkCircles: 0,
      pores: 0,
      pigmentation: 0,
      oiliness: 0,
      sensitivity: 0,
    },

    summary: "Skin analysis is currently unavailable.",

    mainIssue: "Unable to analyze",

    severity: "Unknown",

    visibleFindings: [],

    analysisLimitations: [
      "AI analysis was unavailable.",
      "No skin condition should be inferred without successful image analysis.",
    ],

    concerns: [],

    strengths: [],

    recommendations: {
      cleanser: "Unable to recommend without analysis.",
      serum: "Unable to recommend without analysis.",
      moisturizer: "Unable to recommend without analysis.",
      sunscreen: "Use a broad-spectrum SPF 30+ sunscreen.",
      nightCream: "Unable to recommend without analysis.",
    },

    recommendedIngredients: [],

    avoidIngredients: [],

    recommendedProducts: [],

    foodsToEat: [],

    foodsToAvoid: [],

    dietPlan: {
      breakfast: "Unable to generate personalized plan.",
      morningSnack: "Unable to generate personalized plan.",
      lunch: "Unable to generate personalized plan.",
      eveningSnack: "Unable to generate personalized plan.",
      dinner: "Unable to generate personalized plan.",
      waterIntake: "Maintain normal hydration based on thirst and activity.",
      supplements: "No personalized supplements recommended.",
    },

    exercisePlan: {
      workoutType: "General physical activity",
      duration: "As appropriate",
      weeklyFrequency: "As appropriate",
      exercises: [],
    },

    dailyRoutine: {
      morning: [],
      afternoon: [],
      night: [],
    },

    lifestyle: {
      sleep: "Maintain a regular sleep schedule.",
      stress: "Use healthy stress-management techniques.",
      screenTime: "Take regular breaks from screens.",
      waterGoal: "Maintain adequate hydration.",
      sunExposure: "Use sun protection when outdoors.",
      tips: [],
    },

    weeklyGoals: [],
  };
}

module.exports = {
  getFallbackAnalysis,
};
