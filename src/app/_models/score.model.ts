export interface PointOfInterest {
  id: string;
  lat: number;
  lng: number;
  active: boolean;
}

export interface Achievement {
  id: string;
  value: number;
}

export interface Highscore {
  position: number;
  username: string;
  score: number;
}
