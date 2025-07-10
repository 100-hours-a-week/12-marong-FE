export interface IPlaceRecommendationResponse {
  restaurants: IPlace[];
  cafes: IPlace[];
}

export interface IPlace {
  placeId: number;
  name: string;
  category: string;
  hours: string;
  address: string;
  latitude: number;
  longitude: number;
  isLiked: boolean;
}
