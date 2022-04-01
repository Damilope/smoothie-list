import {
  IIngredient,
  IngredientMeasurementType,
  IngredientType,
} from "../lib/ingredient";

export const appIngredientList: IIngredient[] = [
  {
    name: "Kale",
    type: IngredientType.LeafyGreens,
    ingredientId: "001",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Spinach",
    type: IngredientType.LeafyGreens,
    ingredientId: "002",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Swiss chard",
    type: IngredientType.LeafyGreens,
    ingredientId: "003",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Banana",
    type: IngredientType.Fruit,
    ingredientId: "004",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Mango",
    type: IngredientType.Fruit,
    ingredientId: "005",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Strawberry",
    type: IngredientType.Fruit,
    ingredientId: "006",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Almond milk",
    type: IngredientType.Liquid,
    ingredientId: "007",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Coconut milk",
    type: IngredientType.Liquid,
    ingredientId: "008",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Water",
    type: IngredientType.Liquid,
    ingredientId: "009",
    measurement: IngredientMeasurementType.Cup,
  },
  {
    name: "Peanut butter",
    type: IngredientType.HealthyAddIns,
    ingredientId: "010",
    measurement: IngredientMeasurementType.Teaspoon,
  },
  {
    name: "Protein powder",
    type: IngredientType.HealthyAddIns,
    ingredientId: "011",
    measurement: IngredientMeasurementType.Teaspoon,
  },
  {
    name: "Chia seeds",
    type: IngredientType.HealthyAddIns,
    ingredientId: "012",
    measurement: IngredientMeasurementType.Teaspoon,
  },
  {
    name: "Vanilla extract",
    type: IngredientType.FlavorBooster,
    ingredientId: "013",
    measurement: IngredientMeasurementType.Teaspoon,
  },
  {
    name: "Cinnamon",
    type: IngredientType.FlavorBooster,
    ingredientId: "014",
    measurement: IngredientMeasurementType.Teaspoon,
  },
  {
    name: "Cocoa powder",
    type: IngredientType.FlavorBooster,
    ingredientId: "015",
    measurement: IngredientMeasurementType.Teaspoon,
  },
];
