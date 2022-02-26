import { useReducer } from "react";
import { DockActions, DockDragState, DockState } from "./types";

// se o card encosta em outro e está acima, o que foi encostado sobe.
// se o card encosta o outro e está abaixo, o que foi encostado desce.
// se encosta no dock e em nenhum card, entra na parte de baixo

export enum DockActionTypes {
  addDock = "addDock",
  addCard = "addCard",
  dragCardStart = "dragCardStart",
  dragCardEnd = "dragCardEnd",
  dragCardHover = "dragCardHover",
}

export const dockReducer = (state: DockState, action: DockActions): DockState => {
  switch (action.type) {
    case DockActionTypes.addDock: {
      const newState = { ...state };
      const newId = "dock-" + newState.nextId++;
      newState.docks = { ...newState.docks };
      newState.docks[newId] = { id: newId, cardOrder: [] };
      newState.dockOrder = [...newState.dockOrder, newId];
      return newState;
    }

    case DockActionTypes.addCard: {
      const dockId = action.dockId;
      const newState = { ...state, docks: { ...state.docks }, cards: { ...state.cards } };
      const newId = "card-" + newState.nextId++;
      const newCard = { id: newId, text: "" + newId };
      newState.cards[newId] = newCard;
      newState.docks[dockId] = { ...newState.docks[dockId] };
      newState.docks[dockId].cardOrder = [...newState.docks[dockId].cardOrder, newId];
      return newState;
    }

    case DockActionTypes.dragCardStart: {
      const { id, dockId, index } = action;
      return { ...state, drag: { id, dockId, index } };
    }

    case DockActionTypes.dragCardHover: {
      let { id: hoveredId, dockId: hoveredDock, index: hoveredIndex } = action;
      const { id: draggedId, dockId: draggedDock, index: draggedIndex } = state.drag as DockDragState;
      if (hoveredId === draggedId) return state;
      const newState = { ...state, docks: { ...state.docks } };

      //order can be very important here since draggedDock and hoveredDock can be the same dock
      newState.docks[draggedDock] = { ...newState.docks[draggedDock] };
      newState.docks[hoveredDock] = { ...newState.docks[hoveredDock] };
      const prevDock = newState.docks[draggedDock];
      prevDock.cardOrder = [...prevDock.cardOrder];
      const nextDock = newState.docks[hoveredDock];
      nextDock.cardOrder = [...nextDock.cardOrder];

      prevDock.cardOrder.splice(draggedIndex, 1);

      let movingDown = false;
      if (hoveredDock === draggedDock && hoveredIndex > draggedIndex) {
        // moving down, meaning the splice moved the index of the hovered element
        movingDown = true;
        hoveredIndex--;
      }

      const targetIndex = movingDown ? hoveredIndex + 1 : hoveredIndex;
      nextDock.cardOrder = [
        ...nextDock.cardOrder.slice(0, targetIndex),
        draggedId,
        ...nextDock.cardOrder.slice(targetIndex),
      ];
      newState.drag = { id: draggedId, dockId: hoveredDock, index: targetIndex };
      return newState;
    }

    case DockActionTypes.dragCardEnd: {
      const newState = { ...state };
      delete newState.drag;
      return newState;
    }
  }

  return state;
};

export const initialState = { docks: {}, cards: {}, dockOrder: [], nextId: 0 };

const useDocks = () => {
  const [state, dispatch] = useReducer(dockReducer, initialState);

  return [state, dispatch] as const;
};

export default useDocks;
