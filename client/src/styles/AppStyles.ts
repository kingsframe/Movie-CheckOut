import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";

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
            bottom: theme.spacing(6),
            right: theme.spacing(6),
            backgroundColor: pink[500]
        },
        inline: {
            display: 'inline',
        },
    }),
);

export default useStyles