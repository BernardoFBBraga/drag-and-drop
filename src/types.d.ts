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
  drag?: DockDragState;
};

export type DockDragState = {
  id: number;
  dockId: number;
  index: number;
};

export type DockActions = DockActionAddCard | DockActionAddDock | DockActionDragCard;

export type DockActionAddCard = {
  type: DockActionTypes.addCard;
  dockId: number;
};
export type DockActionAddDock = {
  type: DockActionTypes.addDock;
};

export type DockActionDragCardStart = {
  type: DockActionTypes.dragCardStart;
  id: number;
  dockId: number;
  index: number;
};

export type DockActionDragCardHover = {
  type: DockActionTypes.dragCardHover;
  id: number;
  dockId: number;
  index: number;
};

export type DockActionDragCardEnd = {
  type: DockActionTypes.dragCardEnd;
};
