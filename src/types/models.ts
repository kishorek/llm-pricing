export interface ModelPrice {
  input: number;
  output: number;
  context_window?: number;
}

export interface ModelData {
  [key: string]: ModelPrice;
}