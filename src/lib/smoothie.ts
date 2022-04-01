export interface ISmoothieIngredient {
  ingredientId: string;
  count: number;
}

export interface ISmoothie {
  name: string;
  smoothieId: string;
  ingredients: ISmoothieIngredient[];
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export const smoothieConstants = {
  maxNameLength: 100,
  maxDescriptionLength: 500,
};

export function findSmoothie(smoothies: ISmoothie[], id: string) {
  return smoothies.find((item) => item.smoothieId === id);
}

export function findSmoothieByName(smoothies: ISmoothie[], name: string) {
  name = name.toLowerCase();
  return smoothies.find((item) => item.name.toLowerCase() === name);
}

export function findSmoothieIndex(smoothies: ISmoothie[], id: string) {
  return smoothies.findIndex((item) => item.smoothieId === id);
}
