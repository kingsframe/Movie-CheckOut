import React, {Dispatch, useState} from "react";
import useSWR from "swr";
import apikey from "../apikey.json";
import {Container, TextField,} from "@material-ui/core";

import {pipe} from 'fp-ts/lib/pipeable';
import {fold} from "fp-ts/lib/Either";
import {Action, CartReducerState, MovieSearchData} from "../types/AppTypes";
import useStyles from "../styles/AppStyles";
import {MovieDisplay} from "../components/MovieDisplay";

export default function HomeContainer(props: { onCheckout: Dispatch<Action>, cart: CartReducerState }) {
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
            data => <MovieDisplay data={data} dispatch={props.onCheckout} cart={props.cart}/>))
        }
    </Container>;
}