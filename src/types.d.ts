import { DockActionTypes } from "./useDocks";

export type CardInfo = {
  text: string;
  id: string;
};

export type DockInfo = {
  id: string;
  cardOrder: string[];
};

export type DockState = {
  docks: Record<string, DockInfo>;
  dockOrder: string[];
  cards: Record<string, CardInfo>;
  nextId: number;
  drag?: DockDragState;
};

export type DockDragState = {
  id: string;
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
  id: string;
  dockId: number;
  index: number;
};

export type DockActionDragCardHover = {
  type: DockActionTypes.dragCardHover;
  id: string;
  dockId: number;
  index: number;
};

export type DockActionDragCardEnd = {
  type: DockActionTypes.dragCardEnd;
};
