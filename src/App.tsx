import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Garden } from "./Garden";
import { reorder, move, getPoo } from "./utils";
import { IItem } from "./model/IItem";
import { ItemType } from "./model/ItemType.enum";
import { Zone } from "./model/Zone.enum";
import { Container, createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    item: {
      width: number;
      height: number;
    };
  }

  interface ThemeOptions {
    item?: {
      width: number;
      height: number;
    };
  }
}

const initialItems: { [key: string]: IItem[] } = {
  [Zone.Tools]: [
    {
      id: "item1",
      type: ItemType.Carrot,
      imgSrc: "carrot.jpg"
    },
    {
      id: "item2",
      type: ItemType.Salad,
      imgSrc: "salad.jpg"
    },
    {
      id: "item3",
      type: ItemType.Pumpkin,
      imgSrc: "pumpkin.png"
    }
  ],
  [Zone.Terrarium]: [
    {
      id: "turtle",
      type: ItemType.Turtle,
      imgSrc: "turtle.jpg"
    }
  ],
  [Zone.WC]: [],
  [Zone.Compost]: []
};

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);
  const handleDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newItems = {
        ...items,
        [Zone.WC]: [...items[Zone.WC], getPoo()]
      };
      setItems(newItems);
    }
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.source.droppableId === result.destination.droppableId) {
      const newListItems = reorder(
        items[result.source.droppableId],
        result.source.index,
        result.destination.index
      );
      const newItems = { ...items, [result.source.droppableId]: newListItems };
      setItems(newItems);
    } else {
      const moveResult = move(
        items[result.source.droppableId],
        items[result.destination.droppableId],
        result.source,
        result.destination
      );
      const newItems = {
        ...items,
        [result.source.droppableId]: moveResult[result.source.droppableId],
        [result.destination.droppableId]:
          moveResult[result.destination.droppableId]
      };
      setItems(newItems);
    }
  };
  const handleDeleteClick = () => {
    const newItems = {
      ...items,
      [Zone.Compost]: []
    };
    setItems(newItems);
  };
  const theme = createMuiTheme({});
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Garden items={items} onDeleteClick={handleDeleteClick} />
        </DragDropContext>
      </Container>
    </ThemeProvider>
  );
};

export default App;
