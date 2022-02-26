import { CardInfo } from "./types";

const Card: React.FC<{ info: CardInfo }> = ({ info }) => {
  
  return <div className="card" draggable onDragOver={()=>console.log(info.id)}>{info.id}</div>;
};

export default Card;
