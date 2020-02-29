import React, {ChangeEvent, Fragment, useState} from 'react'
import {Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import axios from 'axios';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield_large: {
            margin: theme.spacing(1, 1),
            width: 300,
        },
        textfield_small: {
            margin: theme.spacing(1, 1),
            width: 100,
        },
        button: {
            margin: theme.spacing(5, 3),
        },
        title: {
            margin: theme.spacing(1, 1),
        }
    }),
);


type QS = {
    category: string
    keyword: string
    result: {}[]
}

const initQS: QS = {
    category: "",
    keyword: "",
    result: [],
}
export const QuickSearch = () => {

    const classes = useStyles();
    const [QS, setQS] = useState(initQS)


    const optionCategory: string[] = [
        "Project",
        "Vendor",
        "Part",
    ]

    const selectCategory = optionCategory.map(
        (option: string, key: number) =>
            <MenuItem key={key} value={option}>
                {option}
            </MenuItem>
    )


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setQS({
            ...QS,
            [name]: value
        })
    }

    //TODO check online if better type than KeyboardEvent<HTMLdivEvent>
    const handleReturn = (event: any) => {
        console.log(`Pressed keyCode ${event.key}`);
        if (event.key === 'Enter') {
            fetchResult()
            event.preventDefault();
        }
    }




    const fetchResult = () => {
        const url: string = `http://${document.domain}:8080`
        const url_string: string = `${url}/qs`
        axios({
            url: url_string,
            method: 'GET',
            params: {
                category: QS.category,
                keyword: QS.keyword,
            }
        }).then(
            (res) => {
                console.log("[quick search] responsible below: ")
                console.log(JSON.stringify(res.data))
                // code here
                }).catch(err => {
            console.log(err)
        })
    }


    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h4" color={"textPrimary"}>
                        Quick Search
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        name="category"
                        value={QS.category}
                        label="Type"
                        select
                        className={classes.textfield_small}
                        onChange={handleChange}
                    >{selectCategory}</TextField>
                </Grid>


                <Grid item xs={9}>
                    <TextField
                        name="keyword"
                        value={QS.keyword}
                        label="Keyword"
                        className={classes.textfield_large}
                        onChange={handleChange}
                        onKeyPress={handleReturn}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}