import { DockActionTypes } from "./useDocks";

export type CardInfo = {
  text: string;
  id: number;
};

export type DockInfo = {
  id: number;
  cardOrder: number[];
};

export type DockState = {
  docks: Record<number, DockInfo>;
  dockOrder: number[];
  cards: Record<number, CardInfo>;
  nextId: number;
};

export type DockActions = DockActionAddCard | DockActionAddDock | DockActionDragCard;

export type DockActionAddCard = {
  type: DockActionTypes.addCard;
  dockId: number;
};
export type DockActionAddDock = {
  type: DockActionTypes.addDock;
};

export type DockActionDragCard = {
  type: DockActionTypes.dragCard;
  cardId: number;
};
