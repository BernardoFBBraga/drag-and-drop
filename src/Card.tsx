import { DockActions, DockState } from "./types";
import { DockActionTypes } from "./useDocks";

interface ICard {
  dockId: string;
  index: number;
  state: DockState;
  cardId: string;
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
      onDragEnter={(event) => {
        dispatch({ type: DockActionTypes.dragCardHover, id, dockId: dockId, index: index });
        event.preventDefault();
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={() => dispatch({ type: DockActionTypes.dragCardEnd })}
    >
      {id}
    </div>
  );
};

export default Card;
