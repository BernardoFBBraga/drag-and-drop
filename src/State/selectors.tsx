import { DockState } from "../types";

export enum CardType {
  dragOrigin = "dragOrigin",
  dragPlaceholder = "dragPlaceholder",
  fixed = "fixed",
}

const cardType = (state: DockState, cardId: string) => {
  if (state.drag?.origin.id === cardId) return CardType.dragOrigin;
  if (state.drag?.id === cardId) return CardType.dragPlaceholder;
  return CardType.fixed;
};

const selectors = { cardType };
export default selectors;
