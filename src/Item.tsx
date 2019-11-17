import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Card, CardContent } from "@material-ui/core";
import { IItem } from "./model/IItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      minHeight: 36,
      padding: 10,
      textAlign: "center",
      margin: 10
    },
    image: {
      [theme.breakpoints.down("sm")]: {
        width: 50,
        height: 50
      },
      [theme.breakpoints.up("md")]: {
        width: 100,
        height: 100
      },
      [theme.breakpoints.up("lg")]: {
        width: 150,
        height: 150
      }
    }
  })
);
export const Item: React.FC<IItem> = props => {
  const classes = useStyles();
  return (
    <Card className={classes.cell}>
      <img className={classes.image} src={`images/${props.imgSrc}`} />
    </Card>
  );
};
