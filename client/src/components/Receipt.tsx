import React, {Dispatch, useState} from "react";
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
import {blue, green} from "@material-ui/core/colors";
import {CheckCircleOutline} from "@material-ui/icons";

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

export default function Receipt(props: { }) {
    const classes = useStyles();

    return <Container className={classes.root} maxWidth="sm">
        <CheckCircleOutline style={{
            color: green[500],
            fontSize: 64,
            margin: 'auto',
            width: "100%"
        }}/>
    </Container>;
}