import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Paper, Grid } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

interface IDraggableItemProps {
  id: string;
  index: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      minHeight: 36,
      padding: 10
    }
  })
);
export const DraggableItem: React.FC<IDraggableItemProps> = props => {
  const classes = useStyles();
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  );
};
