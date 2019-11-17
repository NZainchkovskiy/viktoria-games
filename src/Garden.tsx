import React from "react";
import Grid from "@material-ui/core/Grid";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { IItem } from "./model/IItem";
import { Zone } from "./model/Zone.enum";
interface IGardenProps {
  items: { [key: string]: IItem[] };
}
export const Garden: React.FC<IGardenProps> = props => {
  const renderItem = (item: IItem) => <Item {...item} />;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ItemsList
            id={Zone.Tools}
            items={props.items[Zone.Tools]}
            renderItem={renderItem}
            direction="horizontal"
          />
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
