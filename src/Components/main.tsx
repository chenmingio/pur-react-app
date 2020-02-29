import React from 'react'
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {page, pages} from "../routes"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";
import {Container} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            appBarSpacer: theme.mixins.toolbar,
            content: {
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            },
            container: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
            },
            paper: {
                padding: theme.spacing(2),
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
            },
        },
    ));


const switchPages = pages.map(
    (item: page, key: number) =>
        <Route exact
            path={item.path}
            component={item.component}
            key={key}
        />
)


export const Main = () => {
    const classes = useStyles()

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={10} lg={10}>
                        <Paper className={classes.paper}>
                            <Router>
                                <Switch>
                                    {switchPages}
                                </Switch>
                            </Router>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}