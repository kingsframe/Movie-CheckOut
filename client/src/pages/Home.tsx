import React, {Dispatch, useState} from "react";
import {useHistory} from "react-router-dom";
import useSWR from "swr";
import {
    Avatar,
    Checkbox,
    Container,
    createStyles,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Theme
} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import pink from '@material-ui/core/colors/pink';

import * as t from "io-ts";
import {pipe} from 'fp-ts/lib/pipeable';
import {fold} from "fp-ts/lib/Either";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center'
        },
        searchBox: {
            marginTop: '64px'
        },
        list: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(6),
            right: theme.spacing(6),
            backgroundColor: pink[500]
        },
        inline: {
            display: 'inline',
        },
    }),
);

function ErrorComponent() {
    return <div>ERROR!@!!!</div>;
}

function MovieListItem(props: { details: Movie, dispatch: Dispatch<Action> }) {
    const classes = useStyles();
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

export default function Home(props: { onCheckout: Dispatch<Action> }) {
    const classes = useStyles();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const {data, error} = useSWR(searchQuery ? `http://www.omdbapi.com/?apikey=3ff908c4&s=${searchQuery}` : null);

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

type Action =
    | { type: 'ADD_ITEM', item: Movie }
    | { type: 'REMOVE_ITEM', item: Movie };

export enum Type {
    Game = "game",
    Movie = "movie",
}

const Movie = t.type({
    Title: t.string,
    Year: t.string,
    imdbID: t.string,
    Type: t.string,
    Poster: t.string,
});

const MovieSearchData = t.type({
    Search: t.array(Movie),
    totalResults: t.string,
    Response: t.string,
});

type Movie = t.TypeOf<typeof Movie>
type MovieSearchData = t.TypeOf<typeof MovieSearchData>
// const MovieResult = t.union([MovieSearchError, MovieSearchData]);

// export type MovieSearch = MovieResult | MovieSearchError;

// export interface MovieSearchError {
//     Response: string;
//     Error: string;
// }

// const MovieSearchError = t.type({
//     Response: t.string,
//     Error: t.string,
// });

// export interface MovieResult {
//     Search: Search[];
//     totalResults: string;
//     Response: string;
// }
//
// export interface Search {
//     Title: string;
//     Year: string;
//     imdbID: string;
//     Type: Type;
//     Poster: string;
// }



