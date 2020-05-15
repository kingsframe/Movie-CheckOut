import React, {useReducer} from "react";
import {Route, Switch} from "react-router-dom";
import HomeContainer from "./HomeContainer";
import Checkout from "../pages/Checkout";
import Receipt from "../pages/Receipt";
import {checkoutReducer, initialState} from "../reducer/checkout";

export function PageContainer() {
    const [cart, dispatch] = useReducer(checkoutReducer, initialState);

    return <Switch>
        <Route path="/" exact>
            <HomeContainer onCheckout={dispatch} />;
        </Route>

        <Route path="/checkout" exact>
            <Checkout cart={cart} />;
        </Route>

        <Route path="/receipt" exact>
            <Receipt />;
        </Route>
    </Switch>
}
