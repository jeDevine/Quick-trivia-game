export default interface Question {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  type: string;
  difficulty: string;
  answers?: string[];
}
