import React from "react";
import {AppBar, Box, Container, Link, Toolbar, Typography} from "@material-ui/core";
import {BACKEND_ROOT_URL} from "../config";
import {Print} from "@material-ui/icons";

export default function Page(props: { children: React.ReactNode, style?: React.CSSProperties }) {
    const [open, setOpen] = React.useState(false);

    return <>
        <AppBar position="relative" elevation={1}>
            <Toolbar>
                <Print/><Box mr={1}/>
                <Link href={BACKEND_ROOT_URL} color="inherit">
                    <Typography variant="h6" color="inherit" noWrap>
                        Faxtail
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
        <Container maxWidth="md" style={{backgroundColor: 'white', ...props.style}}>
            {props.children}
            <footer>
                <Box my={3}>
                    <Typography variant="body2" color="textSecondary" align="center">

                        {'Contact us at '}
                        <Link variant="body2" href="mailto:support@faxtail.com?subject=Faxtail.com%20support%20request">
                            support@faxtail.com
                        </Link>

                        <br/>

                        {'Copyright © '}
                        <Link color="inherit" href={BACKEND_ROOT_URL}>
                            Faxtail
                        </Link>
                        {` ${new Date().getFullYear()}`}

                        <br/>

                        <Link variant="body2" onClick={() => setOpen(true)}>
                            Privacy Policy
                        </Link>
                    </Typography>
                </Box>

            </footer>
        </Container>
    </>;
}
