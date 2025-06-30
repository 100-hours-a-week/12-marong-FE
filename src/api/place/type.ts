export interface IPlaceRecommendationResponse {
  restaurants: IPlace[];
  cafes: IPlace[];
}

export interface IPlace {
  name: string;
  category: string;
  hours: string;
  address: string;
  latitude: number;
  longitude: number;
}
