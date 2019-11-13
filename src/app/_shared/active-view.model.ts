export enum View {
  MapsComponent = 'MAPS_COMPONENT',
  AugmentedComponent = 'AUGMENTED_COMPONENT'
}

export interface ViewModel {
  activeView: View | null;
}

export const initialView: ViewModel = {
  activeView: View.MapsComponent
};


