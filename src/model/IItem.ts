import { ItemType } from "./ItemType.enum";

export interface IItem {
  id: string;
  type: ItemType;
  imgSrc: string;
}
