import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Garden } from "./Garden";
import { reorder, move, getPoo } from "./utils";
import { IItem } from "./model/IItem";
import { ItemType } from "./model/ItemType.enum";
import { Zone } from "./model/Zone.enum";
import { Container } from "@material-ui/core";

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
  return (
    <Container maxWidth="xl">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Garden items={items} onDeleteClick={handleDeleteClick} />
      </DragDropContext>
    </Container>
  );
};

export default App;
