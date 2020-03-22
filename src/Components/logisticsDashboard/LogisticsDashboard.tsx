import React, {ChangeEvent, FormEvent, Fragment, useState} from 'react'
import {Box, Grid, MenuItem, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CapacityChart, CapacityChartProps} from "./CapacityChart";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield_basic: {
            margin: theme.spacing(1, 8),
            width: 200,
        },
        button: {
            margin: theme.spacing(5, 3),
        },
        title: {
            margin: theme.spacing(1, 1),
        },
        table: {
            minWidth: 200,
            maxWidth: 500,
        },
    }),
);

type SearchProps = {
    part: string
    vendor_available: string[]
    vendor_selected: string
}


export const LogisticsDashboard = () => {

    const classes = useStyles();

    const url: string = `http://${document.domain}:8080`

    const initSearch: SearchProps = {
        part: "",
        vendor_available: [],
        vendor_selected: "",
    }

    const initDelivery: CapacityChartProps = {
        capacities: {nl: [], apn: [], tool: []},
        demand: {date: [], qty: []},
    }

    const [search, setSearch] = useState(initSearch)
    const [nrm, setNrm] = useState([])
    const [delivery, setDelivery] = useState(initDelivery)


    const handlePartChange = (event: ChangeEvent<HTMLInputElement>) => {
        const part = event.target.value
        setSearch({
            ...initSearch,
            part: part,
        })
    }

    // handleSubmit steps
    // get Nomination Roadmap information
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const part = search.part.trim()
        getNRMData(part)
        updateVendorAvailable(part)
    }

    const getNRMData = (part: string) => {
        const url_string: string = `${url}/logistics/part/${part}/nrm_info`
        axios.get(url_string).then(res => {
            setNrm(res.data)
        }).catch(err => console.log(err))
    }

    // update vendor available to axios result
    // update vendor selected to first of axios result
    // update Delivery to vendor selected
    const updateVendorAvailable = (part: string) => {
        if (part.length > 9) {
            const url_string: string = `${url}/logistics/part/${part}/vendors`
            axios.get(url_string).then(res => {
                const rc = res.data
                if (rc) {
                    const first_vendor = rc[0]
                    setSearch({
                        ...search,
                        vendor_available: rc,
                        vendor_selected: first_vendor
                    })
                    updateDelivery(part, first_vendor)
                } else {
                    setDelivery(initDelivery)
                }
            }).catch(err => console.log(err))
        }
    }

    // update vendor selected
    // update Delivery Chart
    const handleSelectVendor = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const vendor = event.target.value
        setSearch({
            ...search,
            vendor_selected: vendor,
        })
        updateDelivery(search.part, vendor)
    }

    const updateDelivery = (part: string, vendor: string) => {
        const url_string: string = `${url}/logistics/part/${part}/vendor/${vendor}/capacity`
        if (part.length > 9 && vendor) {
            axios.get(url_string).then(res => {
                const rc: CapacityChartProps = res.data
                console.log(rc)
                if (rc) {
                    setDelivery(rc)
                } else {
                    setDelivery(initDelivery)
                }
            })
        }
    }


    const VendorInfoMaker = (vendor_list: any) =>
        vendor_list.map((vendor: any, key: number) => {
            return (
                <Fragment key={key}>
                    <h3>{vendor.vendor}: {vendor.vendor_name}</h3>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fiscal Year</TableCell>
                                    <TableCell align="right">Year Volume in Kpcs</TableCell>
                                    <TableCell align="right">Week Max Capacity in Kpcs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vendor.volumes.map((volume: { year: number; year_volume: number; week_capacity: number; }, key: number) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {volume.year}
                                        </TableCell>
                                        <TableCell align="right">{(volume.year_volume / 1000).toFixed(0)}</TableCell>
                                        <TableCell align="right">{(volume.week_capacity / 1000).toFixed(1)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fragment>
            )
        })


    const nrmProjectInfo = nrm.map((project: any, key: number) => {
        return (
            <Fragment key={key}>
                <h2>{project.project}: {project.project_name}</h2>
                {VendorInfoMaker(project.vendor_list)}
            </Fragment>
        )
    })


    function handleToolSelect(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

    }

    const optionMaker = (options: string[]) =>
        options.map(
            (option: string, key: number) =>
                <MenuItem key={key} value={option}>
                    {option}
                </MenuItem>
        )

    const optionVendors = optionMaker(search.vendor_available)
    // const selectOption_tool = optionMaker(search.tool_available)


    return (
        <Fragment>
            <Grid item xs={12}>
                <Box component={"h2"} bgcolor="secondary.main" color="primary.contrastText" p={2}>
                    Logistics Dashboard
                </Box>
            </Grid>
            <form autoComplete={"off"} onSubmit={handleSubmit}>

                {/* part input */}
                <Grid item>
                    {/* file selection */}
                    <TextField
                        name="part"
                        label={"Part Number"}
                        className={classes.textfield_basic}
                        value={search.part}
                        onChange={handlePartChange}>
                        {search.part}
                    </TextField>

                    {/* vendor selection */}
                    <TextField
                        label={"Vendor"}
                        className={classes.textfield_basic}
                        select
                        value={search.vendor_selected}
                        onChange={handleSelectVendor}>
                        {optionVendors}
                    </TextField>
                </Grid>

                {/*Delivery: demand vs capacity*/}
                <Grid item>
                    <CapacityChart data={delivery}/>
                </Grid>

                {/*nomination roadmap data*/}
                <Grid>
                    {nrmProjectInfo}
                </Grid>


                {/* tool selection */}
                {/*<Grid item xs={12}>*/}
                {/*    <TextField*/}
                {/*        label={"Tooling"}*/}
                {/*        className={classes.textfield_basic}*/}
                {/*        select*/}
                {/*        value={search.tool_selected}*/}
                {/*        onChange={handleToolSelect}>*/}
                {/*        {selectOption_tool}*/}
                {/*    </TextField>*/}
                {/*</Grid>*/}

            </form>
        </Fragment>
    )
}
