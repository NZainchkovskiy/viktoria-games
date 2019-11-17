import React from "react";
import Grid from "@material-ui/core/Grid";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { IItem } from "./model/IItem";
import { Zone } from "./model/Zone.enum";
import {
  Button,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
interface IGardenProps {
  items: { [key: string]: IItem[] };
  onDeleteClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cell: {
      padding: 10,
      textAlign: "center",
      margin: 10
    },
    button: {
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
      },
      margin: 10
    }
  })
);
export const Garden: React.FC<IGardenProps> = props => {
  const classes = useStyles();
  const renderItem = (item: IItem) => <Item {...item} />;
  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <ItemsList
            id={Zone.Tools}
            items={props.items[Zone.Tools]}
            renderItem={renderItem}
            direction="horizontal"
          />
        </Grid>
        <Grid xs={2}>
          <Card className={classes.cell}>
            <IconButton
              className={classes.button}
              onClick={props.onDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        </Grid>
        <Grid item>
          <ItemsList
            id={Zone.Terrarium}
            items={props.items[Zone.Terrarium]}
            renderItem={renderItem}
            direction="vertical"
            isCombineEnabled={true}
          />
          <ItemsList
            id={Zone.WC}
            items={props.items[Zone.WC]}
            renderItem={renderItem}
            direction="vertical"
          />
        </Grid>
        <Grid item>
          <ItemsList
            id={Zone.Compost}
            items={props.items[Zone.Compost]}
            renderItem={renderItem}
            direction="horizontal"
          />
        </Grid>
      </Grid>
    </>
  );
};
