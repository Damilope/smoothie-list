export enum IngredientType {
  LeafyGreens = "leafy greens",
  Fruit = "fruit",
  Liquid = "liquid",
  HealthyAddIns = "healthy add-ins",
  FlavorBooster = "flavor booster",
}

export enum IngredientMeasurementType {
  Cup = "cup",
  Teaspoon = "teaspoon",
}

export interface IIngredient {
  ingredientId: string;
  name: string;
  // description?: string;
  type: string;
  measurement: IngredientMeasurementType;
}
