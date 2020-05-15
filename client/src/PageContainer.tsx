import React, {useReducer} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import isEqual from 'lodash/isEqual';
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";
import {Action, Movie, ReducerState} from "./types/AppTypes";

const initialState = {
    count: 0,
    items: []
};

function checkoutReducer(state:ReducerState, action:Action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                count: state.count + 1,
                items: [...state.items, action.item]
            };
        case 'REMOVE_ITEM':
            return {
                count: state.count - 1,
                items: state.items.filter((item:Movie) => !isEqual(item, action.item))
            };
            default:
            throw new Error();
    }
}

export function PageContainer() {
    const [cart, dispatch] = useReducer(checkoutReducer, initialState);

    return <Switch>
        <Route path="/" exact>
            <Home onCheckout={dispatch} />;
        </Route>

        <Route path="/checkout" exact>
            <Checkout cart={cart} />;
        </Route>


        <Route path="/receipt" exact>
            <Receipt />;
        </Route>
    </Switch>
}
