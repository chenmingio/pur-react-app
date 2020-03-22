import React from 'react'
import {Main} from './components/Main'
import {Header} from "./components/Header";
import {Sidebar} from './components/Sidebar'

import {makeStyles, createStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const drawerWidth = 240;

const useStyles = makeStyles((theme: any) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
    }),
);


export const App = () => {


    const classes = useStyles();
    return (

        <div className={classes.root}>
            <CssBaseline/>
            <Header className={classes}/>
            <Sidebar className={classes}/>
            <Main/>
        </div>
    );
}
