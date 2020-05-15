import React, {Dispatch, useState} from "react";
import {useHistory} from "react-router-dom";
import useSWR from "swr";
import apikey from "../apikey.json";
import {
    Avatar,
    Checkbox,
    Container,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {pipe} from 'fp-ts/lib/pipeable';
import {fold} from "fp-ts/lib/Either";
import {Action, Movie, MovieSearchData} from "../types/AppTypes";
import useStyles from "../styles/AppStyles";

function ErrorComponent() {
    return <div>ERROR!@!!!</div>;
}

function MovieListItem(props: { details: Movie, dispatch: Dispatch<Action> }) {
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

function MovieDisplayComponent(props: { data?: MovieSearchData, dispatch: Dispatch<Action> }) {
    const classes = useStyles();
    const history = useHistory();
    return !props.data ? <ErrorComponent/> :
        <List className={classes.list}>
            {props.data.Search.map((movie, index) => <MovieListItem key={index} details={movie}
                                                                    dispatch={props.dispatch}/>)}
            <Fab className={classes.fab} aria-label="shop" onClick={() => history.push('/checkout')}>
                <ShoppingCartIcon/>
            </Fab>
        </List>;
}

export default function HomeContainer(props: { onCheckout: Dispatch<Action> }) {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const {data, error} = useSWR(searchQuery ? `http://www.omdbapi.com/?apikey=${apikey.key}&s=${searchQuery}` : null);

    if (error) return <div>failed to load</div>;

    const decodedData = MovieSearchData.decode(data);
    return <Container className={classes.root} maxWidth="sm">
        <TextField className={classes.searchBox}
                   required
                   autoFocus
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                   id="outlined-basic"
                   label="Movie search"
                   type="text"
                   variant="outlined"
        />

        {pipe(decodedData, fold(
            () => <div>Please enter a search term</div>,
            data => <MovieDisplayComponent data={data} dispatch={props.onCheckout} />))
        }
    </Container>;
}