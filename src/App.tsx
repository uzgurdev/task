import { useState } from "react";
import "./App.css";
import { Board } from "./components";
import { faker } from "@faker-js/faker";

export type BoardType =
  | "Board 1"
  | "Board 2"
  | "Board 3"
  | "Board 4"
  | "Board 5";

export interface dataType {
  id: string;
  title: string;
  rowType?: BoardType;
  description: string;
}

function App() {
  const boardType: BoardType[] = [
    "Board 1",
    "Board 2",
    "Board 3",
    "Board 4",
    "Board 5",
  ];

  const [data, setData] = useState<dataType[]>(
    new Array(40).fill(null).map((_, idx) => {
      return {
        id: idx.toString(),
        rowType: boardType[Math.floor(Math.random() * 5)],
        title: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
      };
    })
  );

  const [board1, setBoard1] = useState<dataType[]>([
    ...data.filter((board) => board.rowType === "Board 1"),
  ]);
  const [board2, setBoard2] = useState<dataType[]>([
    ...data.filter((board) => board.rowType === "Board 2"),
  ]);

  return (
    <div className="App">
      <div className="navbar"></div>
      <div className="body">
        <div className="sidebar"></div>
        <div className="zone">
          <div className="zone-header">
            <h2 className="header-title">Tasks: {data.length}</h2>
          </div>

          <div className="boards">
            <Board boardIdx={"Board 1"} array={board1} />
            <Board boardIdx={"Board 2"} array={board2} />
            <Board boardIdx={"Board 3"} array={data} />
            <Board boardIdx={"Board 4"} array={data} />
            <Board boardIdx={"Board 5"} array={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
