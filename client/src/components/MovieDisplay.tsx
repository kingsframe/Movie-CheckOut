import {Action, CartReducerState, MovieSearchData} from "../types/AppTypes";
import React, {Dispatch} from "react";
import useStyles from "../styles/AppStyles";
import {useHistory} from "react-router-dom";
import {Fab, List} from "@material-ui/core";
import {MovieListItem} from "./MovieListItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function ErrorComponent() {
    return <div>ERROR!@!!!</div>;
}

export function MovieDisplay(props: { data?: MovieSearchData, dispatch: Dispatch<Action>, cart: CartReducerState }) {
    const classes = useStyles();
    const history = useHistory();
    return !props.data ? <ErrorComponent/> :
        <List className={classes.list}>
            {props.data.Search.map((movie, index) => <MovieListItem key={index} details={movie}
                                                                    dispatch={props.dispatch}/>)}
            {props.cart.count > 0 &&
            <Fab className={classes.fab} aria-label="shop" onClick={() => history.push('/checkout')}>
                <ShoppingCartIcon/>
            </Fab>}
        </List>;
}