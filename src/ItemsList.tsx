import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Paper, Grid } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import { DraggableItem } from "./DraggableItem";

interface IItemsListProps {
  id: string;
  items: any[];
  direction?: "vertical" | "horizontal";
  isCombineEnabled?: boolean;
  renderItem: (item: any) => ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      minHeight: 170,
      minWidth: 170,
      padding: 10,
      display: "flex"
    }
  })
);
export const ItemsList: React.FC<IItemsListProps> = props => {
  const classes = useStyles();
  return (
    <Droppable
      droppableId={props.id}
      direction={props.direction}
      isCombineEnabled={props.isCombineEnabled}
    >
      {provided => (
        <Paper
          ref={provided.innerRef}
          className={classes.cell}
          style={{
            flexDirection: props.direction === "horizontal" ? "row" : "column"
          }}
          elevation={2}
          {...provided.droppableProps}
        >
          {props.items.map((item, index) => (
            <DraggableItem key={item.id} id={item.id} index={index}>
              {props.renderItem(item)}
            </DraggableItem>
          ))}
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};
