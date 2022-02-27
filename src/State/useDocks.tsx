import { useReducer } from "react";
import { DockActionAddPlaceholderCard, DockActions, DockDragState, DockState } from "../types";

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
      const { dockId, cardId, text, index } = action;
      const newState = { ...state, docks: { ...state.docks }, cards: { ...state.cards } };
      const newId = cardId ? cardId : "card-" + newState.nextId++;
      const newCard = { id: newId, text: text ? text : "" + newId };
      newState.cards[newId] = newCard;
      newState.docks[dockId] = { ...newState.docks[dockId] };

      newState.docks[dockId].cardOrder = [
        ...newState.docks[dockId].cardOrder.slice(0, index),
        newId,
        ...(index ? newState.docks[dockId].cardOrder.slice(index) : []),
      ];

      return newState;
    }

    case DockActionTypes.dragCardStart: {
      const { id, dockId, index } = action;
      const placeHolderId = "drag-placeholder-card";
      const addPlaceholderCardAction: DockActionAddPlaceholderCard = {
        type: DockActionTypes.addCard,
        cardId: placeHolderId,
        text: id,
        dockId,
        index: index + 1,
      };
      const newState = dockReducer(state, addPlaceholderCardAction);
      return { ...newState, drag: { id: placeHolderId, dockId, index: index + 1, origin: { id, dockId } } };
    }

    case DockActionTypes.dragCardHover: {
      let { id: hoveredId, dockId: hoveredDock, index: hoveredIndex } = action;
      const { id: placeholderId, dockId: draggedDock, index: draggedIndex } = state.drag as DockDragState;
      if (hoveredId === placeholderId) return state;
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
        placeholderId,
        ...nextDock.cardOrder.slice(targetIndex),
      ];
      newState.drag = { ...(state.drag as DockDragState), id: placeholderId, dockId: hoveredDock, index: targetIndex };
      return newState;
    }

    case DockActionTypes.dragCardEnd: {
      const newState = { ...state, cards: { ...state.cards }, docks: { ...state.docks } };
      const dragState = newState.drag as DockDragState;
      const dockDrop = newState.docks[dragState.dockId];
      dockDrop.cardOrder = [...dockDrop.cardOrder];
      // remove the plaholder card and add the origin card in its position
      dockDrop.cardOrder.splice(dragState.index, 1, dragState.origin.id);
      // now we'll remove the origin card
      const dockOrigin = newState.docks[dragState.origin.dockId];
      dockOrigin.cardOrder = [...dockOrigin.cardOrder];
      const originIndex = dockOrigin.cardOrder.findIndex(
        (id, index) =>
          id === dragState.origin.id && (dragState.origin.dockId !== dragState.dockId || index !== dragState.index)
      );
      dockOrigin.cardOrder.splice(originIndex, 1);
      delete newState.cards[dragState.id];
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
