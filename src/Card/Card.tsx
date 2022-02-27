import { DockActions, DockState } from "../types";
import { DockActionTypes } from "../State/useDocks";
import selectors, { CardType } from "../State/selectors";
import { useEffect, useRef } from "react";

interface ICard {
  dockId: string;
  index: number;
  state: DockState;
  cardId: string;
  dispatch: React.Dispatch<DockActions>;
}

const getClassName = (type: CardType) => {
  switch (type) {
    case CardType.dragOrigin:
      return "card-drag-origin";
    case CardType.dragPlaceholder:
      return "card card-drag-placeholder";
    case CardType.fixed:
      return "card";
  }
};

const Card: React.FC<ICard> = ({ state, cardId, index, dockId, dispatch }) => {
  const { id, text } = state.cards[cardId];
  const cardType = selectors.cardType(state, cardId);

  return (
    <div
      draggable
      onDragStart={() => {
        dispatch({ type: DockActionTypes.dragCardStart, id, dockId, index });
      }}
      onDragEnter={(event) => {
        dispatch({ type: DockActionTypes.dragCardHover, id, dockId, index });
        event.preventDefault();
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragEnd={(e) => {
        if (e.dataTransfer.dropEffect === "none") dispatch({ type: DockActionTypes.dragCardCancel });
        else dispatch({ type: DockActionTypes.dragCardEnd });
      }}
    >
      <CardStyle cardType={cardType}>{text}</CardStyle>
    </div>
  );
};

const CardStyle: React.FC<{ cardType: CardType }> = ({ cardType, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const className = getClassName(cardType);
  useEffect(() => {
    if (ref.current) ref.current.className = className;
  }, [className]);

  return <div ref={ref}>{children}</div>;
};

export default Card;
