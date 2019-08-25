export interface PointOfInterest {
  id: string;
  lat: number;
  lng: number;
  active: boolean;
}
export interface SimplePointOfInterest{
  lat: number;
  lng:number
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
