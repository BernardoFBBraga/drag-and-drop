import React from "react";
import { DockActions, DockState } from "./types";
import Card from "./Card";
import { DockActionTypes } from "./useDocks";

interface IDock {
  id: string;
  state: DockState;
  dispatch: React.Dispatch<DockActions>;
}

const Dock: React.FC<IDock> = ({ id, state, dispatch }) => {
  return (
    <div className="dock">
      <button className="add-card" onClick={() => dispatch({ type: DockActionTypes.addCard, dockId: id })}>
        +
      </button>
      {state.docks[id].cardOrder.map((cardId, index) => (
        <Card state={state} cardId={cardId} key={cardId} index={index} dockId={id} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default Dock;
