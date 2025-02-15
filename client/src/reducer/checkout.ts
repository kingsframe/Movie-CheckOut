import {Action, Movie, CartReducerState} from "../types/AppTypes";
import isEqual from "lodash/isEqual";

export const initialState = {
    count: 0,
    items: []
};

export function checkoutReducer(state:CartReducerState, action:Action) {
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
        case 'CLEAR_CART':
            return {
                count: 0,
                items: []
            };
        default:
            throw new Error();
    }
}