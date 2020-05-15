import {Movie} from "../types/AppTypes";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import React from "react";

export function CartItem(props: { item: Movie }) {
    return <ListItem>
        <ListItemIcon>
            <MovieIcon/>
        </ListItemIcon>
        <ListItemText
            primary={props.item.Title}
            secondary={props.item.Year}
        />
    </ListItem>
}