export interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface UserProgress {
  exerciseId: number;
  accuracy: number;
}
