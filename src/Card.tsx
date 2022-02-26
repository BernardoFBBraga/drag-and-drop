import { CardInfo, DockActions } from "./types";
import { DockActionTypes } from "./useDocks";

interface ICard {
  info: CardInfo;
  dockId: number;
  index: number;
  dispatch: React.Dispatch<DockActions>;
}

const Card: React.FC<ICard> = ({ info, index, dockId, dispatch }) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={() => dispatch({ type: DockActionTypes.dragCardStart, id: info.id, dockId: dockId, index: index })}
      onDragEnter={() => dispatch({ type: DockActionTypes.dragCardHover, id: info.id, dockId: dockId, index: index })}
      onDragEnd={() => dispatch({ type: DockActionTypes.dragCardEnd})}
    >
      {info.id}
    </div>
  );
};

export default Card;
