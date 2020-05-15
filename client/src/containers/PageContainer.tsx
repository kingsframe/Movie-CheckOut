import React, {useReducer} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Receipt from "../pages/Receipt";
import {checkoutReducer, initialState} from "../reducer/checkout";

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
