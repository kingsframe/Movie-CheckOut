import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";
import {blue} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center'
        },
        searchBox: {
            marginTop: theme.spacing(8)
        },
        list: {
            marginTop: theme.spacing(4),
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        card: {
            marginTop: theme.spacing(4),
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(6),
            right: theme.spacing(6),
            backgroundColor: pink[500]
        },
        checkout: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            backgroundColor: blue[500]
        },
        browseAgain: {
            top: theme.spacing(4),
            backgroundColor: blue[500]
        },
        inline: {
            display: 'inline',
        },
    }),
);

export default useStyles