import React, {useReducer} from "react";
import {Route, Switch} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import Checkout from "../components/Checkout";
import Receipt from "../components/Receipt";
import {checkoutReducer, initialState} from "../reducer/checkout";

export function MainRoutePage() {
    const [cart, dispatch] = useReducer(checkoutReducer, initialState);

    return <Switch>
        <Route path="/" exact>
            <HomeContainer onCheckout={dispatch} cart={cart}/>;
        </Route>

        <Route path="/checkout" exact>
            <Checkout cart={cart} />;
        </Route>

        <Route path="/receipt" exact>
            <Receipt />;
        </Route>
    </Switch>
}
