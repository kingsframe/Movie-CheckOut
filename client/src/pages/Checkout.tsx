import React, {Dispatch, useState} from "react";
import {useHistory} from "react-router-dom";
import {
    Container,
    createStyles,
    Fab,
    List,
    ListItem, ListItemIcon,
    ListItemText,
    ListSubheader,
    TextField,
    Theme
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {makeStyles} from "@material-ui/core/styles";
import MovieIcon from '@material-ui/icons/Movie';
import * as t from "io-ts";
import {blue} from "@material-ui/core/colors";

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
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            backgroundColor: blue[500]
        },
        inline: {
            display: 'inline',
        },
    }),
);

type ReducerState = {
    count: number,
    items: Movie[]
};

const Movie = t.type({
    Title: t.string,
    Year: t.string,
    imdbID: t.string,
    Type: t.string,
    Poster: t.string,
});

type Movie = t.TypeOf<typeof Movie>

function CartItem(props: {item: Movie}){
    return <ListItem>
        <ListItemIcon>
            <MovieIcon />
        </ListItemIcon>
        <ListItemText
            primary={props.item.Title}
            secondary={props.item.Year}
        />
    </ListItem>
}

export default function Checkout(props: { cart: ReducerState }) {
    const classes = useStyles();
    const history = useHistory();

    return <Container className={classes.root} maxWidth="sm">
        <List dense={true}
            className={classes.list}
            subheader={
            <ListSubheader component="div" id="checkout-list-subheader">
                Items Ready to be Checked Out
            </ListSubheader>
        }>
            {props.cart.items.map((movie, index) => <CartItem key={index} item={movie}/>)}
            <Fab className={classes.fab} aria-label="check-out" variant="extended" onClick={()=>history.push('/receipt')}>
                <ShoppingCartIcon/>
                Checkout!
            </Fab>
        </List>
    </Container>;
}