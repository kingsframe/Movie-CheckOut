import React from "react";
import {useHistory} from "react-router-dom";
import {Container, Fab, List, ListSubheader,} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {CartReducerState} from "../types/AppTypes";
import useStyles from "../styles/AppStyles";
import {CartItem} from "./CartItem";

export default function Checkout(props: { cart: CartReducerState }) {
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
            <Fab className={classes.checkout} aria-label="check-out" variant="extended" onClick={()=>history.push('/receipt')}>
                <ShoppingCartIcon/>
                Checkout!
            </Fab>
        </List>
    </Container>;
}