// DragAndDrop.tsx

import React, { useState, useRef } from "react";

interface Item {
  id: number;
  text: string;
}

const DragAndDrop: React.FC = () => {
  const [rows, setRows] = useState<Item[][]>([
    [
      { id: 1, text: "Item 1" },
      { id: 2, text: "Item 2" },
      { id: 3, text: "Item 3" },
    ],
    [
      { id: 4, text: "Item 4" },
      { id: 5, text: "Item 5" },
      { id: 6, text: "Item 6" },
    ],
  ]);

  const dragItem = useRef<Item | null>(null);
  const dragRowIndex = useRef<number | null>(null);
  const dragItemIndex = useRef<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: Item,
    rowIndex: number,
    colIndex: number
  ) => {
    dragItem.current = item;
    dragRowIndex.current = rowIndex;
    dragItemIndex.current = colIndex;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    e.preventDefault();

    if (
      !dragItem.current ||
      dragRowIndex.current === null ||
      dragItemIndex.current === null
    ) {
      return;
    }

    // If the dragged item is from the same row, rearrange the items within the row
    if (dragRowIndex.current === rowIndex) {
      const newRows = [...rows];
      const draggedRow = newRows[rowIndex];
      const [removed] = draggedRow.splice(dragItemIndex.current, 1);
      draggedRow.splice(colIndex, 0, removed);
      setRows(newRows);
    }

    // If the dragged item is from a different row, move it to the new row
    else {
      const sourceRow = rows[dragRowIndex.current];
      const updatedSourceRow = sourceRow.filter(
        (item) => item !== dragItem.current
      );
      const newRows = [...rows];
      newRows[dragRowIndex.current] = updatedSourceRow;

      const targetRow = newRows[rowIndex];
      targetRow.splice(colIndex, 0, dragItem.current);

      setRows(newRows);
    }
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragRowIndex.current = null;
    dragItemIndex.current = null;
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            width: "400px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ccc",
          }}
        >
          {row.map((item, colIndex) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, rowIndex, colIndex)}
              onDragOver={(e) => handleDragOver(e, rowIndex, colIndex)}
              onDragEnd={handleDragEnd}
              style={{
                border: "1px solid",
                padding: "8px",
                marginBottom: "8px",
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
