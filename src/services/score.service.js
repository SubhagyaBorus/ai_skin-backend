function getFallbackAnalysis() {
  return {
    overallScore: 50,
    skinType: 'Combination',
    skinTone: 'Medium',
    textureScore: 50,
    hydrationScore: 50,
    acneScore: 20,
    wrinkleScore: 20,
    darkCircleScore: 25,
    poreScore: 40,
    pigmentationScore: 30,
    oilinessScore: 45,
    sensitivityScore: 30,
    summary: 'Fallback analysis (AI unavailable).',
    concerns: ['Unable to analyze'],
    strengths: ['General care recommended'],
    recommendations: {
      cleanser: 'Gentle cleanser',
      serum: 'Basic serum',
      moisturizer: 'Light moisturizer',
      sunscreen: 'SPF 50',
      nightCream: 'Basic night cream',
    },
    ingredients: ['Hyaluronic Acid'],
    foodsToEat: ['Vegetables', 'Fruits'],
    foodsToAvoid: ['Processed Sugar'],
    dietPlan: {
      breakfast: 'Oatmeal',
      morningSnack: 'Fruit',
      lunch: 'Salad',
      eveningSnack: 'Nuts',
      dinner: 'Grilled chicken',
      waterIntake: '8 glasses',
      supplements: 'Vitamin C',
    },
    exercisePlan: {
      workoutType: 'Cardio',
      duration: '30 min',
      weeklyFrequency: '3 times',
      exercises: ['Walking', 'Jogging', 'Cycling'],
    },
    dailyRoutine: {
      morning: ['Cleanse', 'Moisturize', 'SPF'],
      afternoon: ['Hydrate'],
      night: ['Cleanse', 'Night cream'],
    },
    lifestyle: {
      sleep: '8 hours',
      stress: 'Meditate',
      screenTime: 'Limit',
      waterGoal: '8 glasses',
      sunExposure: 'Use SPF',
      tips: ['Stay hydrated', 'Eat healthy', 'Exercise regularly'],
    },
    weeklyGoals: ['Maintain routine'],
    recommendedProducts: [
      { category: 'Cleanser', name: 'Basic Cleanser', reason: 'General use' },
    ],
  };
}

module.exports = { getFallbackAnalysis };