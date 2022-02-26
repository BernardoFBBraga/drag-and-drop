import { useReducer } from "react";
import { DockActions, DockState } from "./types";

// se o card encosta em outro e está acima, o que foi encostado sobe.
// se o card encosta o outro e está abaixo, o que foi encostado desce.
// se encosta no dock e em nenhum card, entra na parte de baixo

export enum DockActionTypes {
  addDock = "addDock",
  addCard = "addCard",
  dragCard = "dragCard",
}

export const dockReducer = (state: DockState, action: DockActions): DockState => {
  switch (action.type) {
    case DockActionTypes.addDock: {
      const newState = { ...state };
      const newId = newState.nextId++;
      newState.docks = { ...newState.docks };
      newState.docks[newId] = { id: newId, cardOrder: [] };
      newState.dockOrder = [...newState.dockOrder, newId];
      return newState;
    }

    case DockActionTypes.addCard: {
      const dockId = action.dockId;
      const newState = { ...state, docks: { ...state.docks }, cards: { ...state.cards } };
      const newId = newState.nextId++;
      const newCard = { id: newId, text: "" + newId };
      newState.cards[newId] = newCard;
      newState.docks[dockId] = { ...newState.docks[dockId] };
      newState.docks[dockId].cardOrder = [...newState.docks[dockId].cardOrder, newId];
      return newState;
    }
    case DockActionTypes.dragCard:
      return state;
  }
};

export const initialState = { docks: {}, cards: {}, dockOrder: [], nextId: 0 };

const useDocks = () => {
  const [state, dispatch] = useReducer(dockReducer, initialState);

  return [state, dispatch] as const;
};

export default useDocks;
