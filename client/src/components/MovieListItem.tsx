import {Action, Movie} from "../types/AppTypes";
import React, {Dispatch, useState} from "react";
import {Avatar, Checkbox, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";

export function MovieListItem(props: { details: Movie, dispatch: Dispatch<Action> }) {
    const [isChecked, setIsChecked] = useState(false);
    const onClick = () => {
        if (isChecked) {
            props.dispatch({type: 'REMOVE_ITEM', item: props.details});
        } else {
            props.dispatch({type: 'ADD_ITEM', item: props.details});
        }
        setIsChecked(!isChecked);
    };
    return (
        <ListItem button
                  onClick={onClick}>
            <ListItemAvatar>
                <Avatar
                    alt={props.details.Title}
                    src={props.details.Poster}
                />
            </ListItemAvatar>
            <ListItemText id={props.details.imdbID} primary={props.details.Title} secondary={props.details.Year}/>
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    checked={isChecked}
                    onChange={onClick}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}