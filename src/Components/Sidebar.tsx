import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import {page, pages} from "../routes"


const itemList = pages.map(
    function mapPage(item: page, key: number) {
        return (
            <ListItem button key={key} component="a" href={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name}/>
            </ListItem>
        )
    }
)


export const Sidebar = (props: any) => {
    const classes = props.className

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}/>
            <List>
                {itemList}
            </List>
            <Divider/>
        </Drawer>
    )
}