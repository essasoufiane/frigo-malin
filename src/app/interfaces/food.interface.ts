import { Category } from "./category.interface";

export interface Food {
  id?: string;
  foodName: string;
  datePlacedInFreezer: Date;
  category: Category;
  betterToEatBefore: Date;
  userId: string;
}
