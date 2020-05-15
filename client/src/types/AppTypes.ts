import * as t from "io-ts";

const Movie = t.type({
    Title: t.string,
    Year: t.string,
    imdbID: t.string,
    Type: t.string,
    Poster: t.string,
});

export type Movie = t.TypeOf<typeof Movie>

export type ReducerState = {
    count: number,
    items: Movie[]
};

export type Action =
    | { type: 'ADD_ITEM', item: Movie}
    | { type: 'REMOVE_ITEM', item: Movie};
