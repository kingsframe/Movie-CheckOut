import * as t from "io-ts";

export const Movie = t.type({
    Title: t.string,
    Year: t.string,
    imdbID: t.string,
    Type: t.string,
    Poster: t.string,
});

export type Movie = t.TypeOf<typeof Movie>

export const MovieSearchData = t.type({
    Search: t.array(Movie),
    totalResults: t.string,
    Response: t.string,
});

export type MovieSearchData = t.TypeOf<typeof MovieSearchData>

export type CartReducerState = {
    count: number,
    items: Movie[]
};

export type Action =
    | { type: 'ADD_ITEM', item: Movie}
    | { type: 'REMOVE_ITEM', item: Movie};
