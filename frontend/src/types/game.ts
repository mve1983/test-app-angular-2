export type GameCategory = {
  id: number;
  name: string;
};

export type GameData = {
  userData: {
    username: string;
    slogan: string | null;
  };
  categories: {
  categoryOne: string;
  difficultyOne: string;
  categoryTwo: string;
  difficultyTwo: string;
  categoryThree: string;
  difficultyThree: string;
  categoryFour: string;
  difficultyFour: string;
  categoryFive: string;
  difficultyFive: string;
  }
};

export type Question = {
  question: string;
  possibleAnswers: string[];
  correctAnswer: string;
  category: string;
  difficulty: string;
};

export type GameScore = {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  difficulty: string;
  yourPoints: number;
};

export type CurrentlyChoosedCategories =  {
  categoryOne: string | null;
  categoryTwo: string | null;
  categoryThree: string | null;
  categoryFour: string | null;
  categoryFive: string | null;
};
