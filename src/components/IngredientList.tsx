import { List } from "antd";
import React from "react";
import { IIngredient } from "../lib/ingredient";
import { ISmoothieIngredient } from "../lib/smoothie";
import IngredientUpdateButton from "./IngredientUpdateButton";

export interface IIngredientListProps {
  editable?: boolean;
  useSmoothieIngredientAsDataSource?: boolean;
  ingredients: IIngredient[];
  smoothieIngredients: ISmoothieIngredient[];
  onChange: (value: ISmoothieIngredient[]) => void;
}

const IngredientList: React.FC<IIngredientListProps> = (props) => {
  const {
    editable,
    ingredients,
    smoothieIngredients,
    useSmoothieIngredientAsDataSource,
    onChange,
  } = props;

  const smoothieIngredientsMap = React.useMemo(() => {
    return smoothieIngredients.reduce((map, item) => {
      map[item.ingredientId] = item;
      return map;
    }, {} as Record<string, ISmoothieIngredient>);
  }, [smoothieIngredients]);

  const handleUpdateIngredientCount = React.useCallback(
    (count: number, ingredientId: string) => {
      const index = smoothieIngredients.findIndex((item) => {
        return item.ingredientId === ingredientId;
      });

      const updatedIngredients: ISmoothieIngredient[] = [
        ...smoothieIngredients,
      ];

      if (index === -1) {
        updatedIngredients.push({ ingredientId, count });
      } else {
        updatedIngredients[index] = { ...updatedIngredients[index], count };
      }

      onChange(updatedIngredients);
    },
    [smoothieIngredients, onChange]
  );

  return (
    <List
      bordered
      dataSource={ingredients}
      renderItem={(ingredient) => {
        const count =
          smoothieIngredientsMap[ingredient.ingredientId]?.count || 0;

        if (useSmoothieIngredientAsDataSource && count === 0) {
          return null;
        }

        return (
          <List.Item>
            <List.Item.Meta
              title={ingredient.name}
              description={`${ingredient.type} — ${count} ${ingredient.measurement}(s)`}
            />
            {editable && (
              <IngredientUpdateButton
                count={count}
                onChange={(count) =>
                  handleUpdateIngredientCount(count, ingredient.ingredientId)
                }
              />
            )}
          </List.Item>
        );
      }}
    />
  );
};

export default IngredientList;
