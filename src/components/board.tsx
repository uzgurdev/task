import React from "react";
import { Empty } from "../assets/images";
import { BoardType, dataType } from "../App";

interface BoardProps {
  array?: dataType[];
  setArray?: React.Dispatch<React.SetStateAction<dataType[]>>;
  boardIdx?: BoardType;
}

const Board: React.FC<BoardProps> = ({ array, setArray, boardIdx }) => {
  const arrayLength = array
    ? array.filter((item) => item.rowType === boardIdx).length
    : 0;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (boardIdx && setArray) {
      const updatedArray = array?.map((item) =>
        item.id === e.dataTransfer.getData("text/plain")
          ? { ...item, rowType: boardIdx }
          : item
      );

      setArray(updatedArray || []);
    }
  };

  return (
    <div
      className="board"
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="board-header">
        <h1 className="board-header-title">
          Закрытые <span className="dot"></span> {arrayLength}
        </h1>
      </div>
      <div className="board-body">
        {arrayLength === 0 && (
          <div className="empty">
            <Empty />
            <h2 className="board-body-title">
              Если есть подходящие заявки, перетащите их сюда 🤓
            </h2>
          </div>
        )}

        {array && arrayLength !== 0 && (
          <div className="cards">
            {array.map((card) => (
              <div
                key={card.id}
                className="card"
                draggable={true}
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", card.id);
                  console.log("onDragStart");
                }}
                onDragEnd={(e) => console.log("onDragEnd")}
              >
                <h2 className="card-title">{card.title}</h2>
                <p className="card-title">{card.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
