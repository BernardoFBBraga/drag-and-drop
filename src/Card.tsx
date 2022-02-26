import { DockActions, DockState } from "./types";
import { DockActionTypes } from "./useDocks";

interface ICard {
  dockId: number;
  index: number;
  state: DockState;
  cardId: number;
  dispatch: React.Dispatch<DockActions>;
}

const Card: React.FC<ICard> = ({ state, cardId, index, dockId, dispatch }) => {
  const { id } = state.cards[cardId];
  const dragging = state.drag?.id === cardId;
  return (
    <div
      className={`card${dragging ? " card-dragging" : ""}`}
      draggable
      onDragStart={() => dispatch({ type: DockActionTypes.dragCardStart, id, dockId: dockId, index: index })}
      onDragEnter={() => dispatch({ type: DockActionTypes.dragCardHover, id, dockId: dockId, index: index })}
      onDragEnd={() => dispatch({ type: DockActionTypes.dragCardEnd })}
    >
      {id}
    </div>
  );
};

export default Card;
