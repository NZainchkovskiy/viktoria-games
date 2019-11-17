import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Card, CardContent } from "@material-ui/core";
import { IItem } from "./model/IItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      minHeight: 36,
      padding: 10,
      width: 150,
      height: 150,
      textAlign: "center",
      margin: 10
    },
    image: {
      width: 118,
      height: 118
    }
  })
);
export const Item: React.FC<IItem> = props => {
  const classes = useStyles();
  return (
    <Card className={classes.cell}>
      <CardContent>
        <img className={classes.image} src={`images/${props.imgSrc}`} />
      </CardContent>
    </Card>
  );
};
