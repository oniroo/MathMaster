
export const MATH_TOPIC = '지수함수의 성질, 그래프, 방정식과 부등식';

export const PROBLEM_SCHEMA_PROPERTIES = {
  question: { type: 'STRING' },
  choices: { type: 'ARRAY', items: { type: 'STRING' } },
  correctAnswer: { type: 'STRING' },
  explanation: { type: 'STRING' },
  difficulty: { type: 'STRING', enum: ["쉬움", "보통", "어려움", "킬러"] },
  source: { type: 'STRING' }
};
