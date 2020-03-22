import React, {ChangeEvent, Fragment, useState} from 'react'
import {Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield_large: {
            margin: theme.spacing(1, 1),
            width: 300,
        },
        textfield_small: {
            margin: theme.spacing(1, 1),
            width: 300,
        },
        button: {
            margin: theme.spacing(5, 3),
        },
        title: {
            margin: theme.spacing(1, 1),
        },
        table: {
            minWidth: 300,
            maxWidth: 500,
        },
    }),
);

type ROW = string[]

type QS = {
    category: string
    keyword: string
    result: {
        fields: string[]
        rows: ROW[]
    }
}

const initSearch: QS = {
    category: "Project",
    keyword: "",
    result: {
        fields: [],
        rows: [],
    },
}
export const QuickSearch = () => {

    const classes = useStyles();
    const [search, setSearch] = useState(initSearch)


    const optionCategory: string[] = [
        "Project",
        "Vendor",
        "Part Number",
    ]

    const selectCategory = optionCategory.map(
        (option: string, key: number) =>
            <MenuItem key={key} value={option}>
                {option}
            </MenuItem>
    )


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setSearch({
            ...search,
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
                category: search.category,
                keyword: search.keyword,
            }
        }).then(
            (res) => {
                console.log("[quick search] responsible below: ")
                console.log(JSON.stringify(res.data))
                // guard in case result in None
                if (res.data) {
                    setSearch({
                        ...search,
                        result: res.data,
                    })
                }
            }).catch(err => {
            console.log(err)
        })
    }

    const {fields, rows} = search.result

    const tableHead = fields.map(
        (field: string, key: number) => <TableCell align="left" key={key}>{field}</TableCell>
    )

    const tableBody = rows.map((row, row_id) => (
        <TableRow key={row_id}>
            {row.map(
                (cell: string, cell_id: number) => (
                    <TableCell component="th" scope="row" key={cell_id}>{cell}</TableCell>
                )
            )}
        </TableRow>
    ))


    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h4" color={"textPrimary"}>
                        Quick Search
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="subtitle2" color={"textPrimary"}>
                        Support Fuzzy Search. Project/Vendor ID is auto detected if correct.<br/>
                        SPACE will not be trimmed so that you can exclude ACED from ACE by input ACE[SPACE].

                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        name="category"
                        value={search.category}
                        label="Type"
                        select
                        className={classes.textfield_small}
                        onChange={handleChange}
                    >{selectCategory}</TextField>
                </Grid>


                <Grid item xs={9}>
                    <TextField
                        name="keyword"
                        value={search.keyword}
                        label="Keyword"
                        className={classes.textfield_large}
                        onChange={handleChange}
                        onKeyPress={handleReturn}
                    />
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHead}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}


