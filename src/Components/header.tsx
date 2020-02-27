import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";


export const Header = (props: any) => {
    const classes = props.className

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" color="inherit" >
                    Purchasing App
                </Typography>
            </Toolbar>
        </AppBar>
    )
}