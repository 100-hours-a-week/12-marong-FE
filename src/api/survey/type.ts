export interface ISurveyRequest {
  eiScore: number;
  snScore: number;
  tfScore: number;
  jpScore: number;
  hobbies: string[];
  likedFoods: string[];
  dislikedFoods: string[];
}

export interface ISurveyResponse {
  eiScore: number;
  snScore: number;
  tfScore: number;
  jpScore: number;
  hobbies: string[];
  likedFoods: string[];
  dislikedFoods: string[];
}
