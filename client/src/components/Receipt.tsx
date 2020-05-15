import React, {Dispatch} from "react";
import {useHistory} from "react-router-dom";
import {
    Card,
    Container,
    Fab,
    Typography
} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {CheckCircleOutline} from "@material-ui/icons";
import useStyles from "../styles/AppStyles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {Action} from "../types/AppTypes";

export default function Receipt(props: {onComplete: Dispatch<Action>}) {
    const classes = useStyles();
    const history = useHistory();
    const handleComplete = () => {
        history.push('/')
        props.onComplete({type: "CLEAR_CART"})
    }

    return <Container className={classes.root} maxWidth="sm">
        <Card className={classes.card}>
            <CheckCircleOutline style={{
                color: green[500],
                fontSize: 64,
                margin: 'auto',
                width: "100%"
            }}/>
            <Typography variant="h5" component="h2" gutterBottom>
                Your Order has been submitted
            </Typography>
            <Typography variant="body2" component="p">
                We will send you a confirmation email
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                Your Order ID is {Math.random()*100000000000000000}
            </Typography>
            <Fab className={classes.browseAgain} aria-label="browse-again" variant="extended" onClick={handleComplete}>
                <ShoppingCartIcon/>
                Browse again
            </Fab>
        </Card>
    </Container>;
}