import React, {useReducer, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import {HOMEPAGE, PageToDisplay} from "./config";
import isEqual from 'lodash/isEqual';
import * as t from "io-ts";
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";

const Movie = t.type({
    Title: t.string,
    Year: t.string,
    imdbID: t.string,
    Type: t.string,
    Poster: t.string,
});

type Movie = t.TypeOf<typeof Movie>

type ReducerState = {
    count: number,
    items: Movie[]
};

type Action =
    | { type: 'ADD_ITEM', item: Movie}
    | { type: 'REMOVE_ITEM', item: Movie};

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

//doesn't go back to homepage, when at the end
// function getNextPage(page: PageToDisplay): PageToDisplay {
//     const PAGE_COUNT = Object.keys(PageToDisplay).length / 2;
//     return (page % PAGE_COUNT) + 1;
// }
//
// function getPreviousPage(page: PageToDisplay): PageToDisplay {
//     if (page === 0 || page === PageToDisplay.Receipt) {
//         throw new Error(`previous page not defined for ${page}`);
//     }
//     return page - 1;
// }

export function PageContainer() {
    // const [page, setPage] = useState(HOMEPAGE);
    const [cart, dispatch] = useReducer(checkoutReducer, initialState);

    return (<Switch>
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
)
    // switch (page) {
    //     case PageToDisplay.Home:
    //         return <Home onNext={() => setPage(getNextPage(PageToDisplay.Home))} onCheckout={dispatch}/>;
    //     case PageToDisplay.Checkout:
    //         return <Checkout cart={cart} onNext={() => setPage(getNextPage(PageToDisplay.Receipt))} />;
    //     case PageToDisplay.Receipt:
    //         return <Receipt />
    //     default:
    //         return <>Error</>;
    // }
}
