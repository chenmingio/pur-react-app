import React, {Fragment, ChangeEvent, useState} from 'react'
import axios from 'axios';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Button,
    Grid,
    Box,
    Input, Checkbox, ListItemText
} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield_basic: {
            margin: theme.spacing(3, 5),
            width: 200,
        },
        divider_basic: {
            margin: theme.spacing(1, 5),
        },
        subtitle: {
            margin: theme.spacing(0, 3),
        },
        button: {
            margin: theme.spacing(5, 5),
        },
        formControl: {
            margin: theme.spacing(5, 5),
            width: 200,
        },
    }),
);


type SourceProps = {
    project: string
    vendor_available: string[]
    vendor_selected: string
    part_available: string[]
    part_selected: string[]
    file_selected: string
}

export const SourcingDoc = () => {

    const classes = useStyles();


    const url: string = `http://${document.domain}:8080`

    const initSource: SourceProps = {
        project: "",
        vendor_available: [],
        vendor_selected: "",
        part_selected: [],
        part_available: [],
        file_selected: "",
    };

    const [source, setSource] = useState(initSource)

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = event.target
        setSource({
            ...initSource,
            file_selected: value,
        })
    }

    const handleProjectChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setSource({
            ...source,
            [name]: value
        })
    }

    const handleProjectBlur = () => {
        if (source.file_selected === "nomination letter") {
            fetchVendor()
        } else if (source.file_selected === "risk evaluation") {
            fetchPart_Project()
        }
    }

    const fetchVendor = () => {
        //TODO check if any project is less than 11
        const project = source.project
        if (project.length > 11) {
            const url_string: string = `${url}/project/${project}/vendors`
            axios.get(url_string).then(res => {
                setSource({
                    ...source,
                    vendor_available: res.data,
                    vendor_selected: "",
                    part_available: [],
                    part_selected: [],
                })
                console.log("[fetch vendor] responsible data below: ")
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }


    function fetchPart_Project() {

        const url_string: string = `${url}/project/${source.project}/parts`
        axios.get(url_string).then(res => {
            setSource({
                ...source,
                part_available: (res.data) ? res.data.concat(["all"]) : [],
                part_selected: [],
            })
        }).catch(err => {
            console.log(err)
        })
    }


    function handleVendorSelect(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const vendor = event.target.value

        const url_string: string = `${url}/project/${source.project}/vendor/${vendor}/parts`
        axios.get(url_string).then(res => {
            setSource({
                ...source,
                vendor_selected: vendor,
                part_available: (res.data) ? res.data.concat(["all"]) : [],
                part_selected: [],
            })
        }).catch(err => {
            console.log(err)
        })
    }




    // function handleSelectFile(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     // update file selected
    //     const {value} = event.target
    //     setSource({
    //         ...source,
    //         file_selected: value,
    //     })
    // }

    // const handleChangePart = (event: ChangeEvent<{ value: unknown }>) => {
    //     const {options} = event.target as HTMLSelectElement;
    //     const value: string[] = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //     }
    //     setSource({
    //         ...source,
    //         part_selected: value
    //     });
    // };

    const handleChangePart = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSource({
            ...source,
            part_selected: event.target.value as string[]
        });
    };

    function fileDownload() {
        let url_string: string = `${url}/docs`
        axios({
            url: url_string,
            method: 'GET',
            params: {
                file: source.file_selected,
                project: source.project,
                vendor: source.vendor_selected,
                part_list: source.part_selected,
            }
        }).then(
            (res) => {
                console.log("[download file] responsible below: ")
                console.log(JSON.stringify(res.data))
                const filename = res.data
                if (filename) {
                    const url_download = `${url}/downloads/${filename}`
                    const link = document.createElement('a');
                    link.href = url_download;
                    document.body.appendChild(link);
                    link.click();
                    link.remove()
                }
            }
        ).catch(err => {
            console.log(err)
        })
    }


    const SelectMaker = (options: string[]) =>
        options.map(
            (option: string, key: number) =>
                <MenuItem key={key} value={option}>
                    {option}
                </MenuItem>
        )


    const option_file: string[] = [
        "risk evaluation",
        "supplier selection",
        "cost breakdown",
        "nomination letter",

    ]


    const selectOption_file = SelectMaker(option_file)
    const selectOption_vendor = SelectMaker(source.vendor_available)

    // menu style for tag multi selector
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    return (
        <Fragment>

            <Grid item xs={12}>
                <Box component={"h2"} bgcolor="secondary.main" color="primary.contrastText" p={2}>
                    Sourcing Document Auto
                </Box>
            </Grid>
            <form autoComplete={"off"}>

                <Grid item xs={12}>
                    {/* file selection */}
                    <TextField
                        name = "file_selected"
                        label= "File Type"
                        className={classes.textfield_basic}
                        select
                        value={source.file_selected}
                        onChange={handleChangeFile}>
                        {selectOption_file}
                    </TextField>

                    {/* project input */}
                    <TextField
                        name={"project"}
                        label={"Project No."}
                        className={classes.textfield_basic}
                        value={source.project}
                        onChange={handleProjectChange}
                        onBlur={handleProjectBlur}>
                        {selectOption_file}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    {/* vendor selection */}
                    <TextField
                        label={"Vendor"}
                        disabled={(source.file_selected !== "nomination letter")}
                        className={classes.textfield_basic}
                        select
                        value={source.vendor_selected}
                        onChange={handleVendorSelect}>
                        {selectOption_vendor}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    {/*part selection*/}
                    <FormControl className={classes.formControl}>
                        <InputLabel>Part</InputLabel>
                        <Select
                            multiple
                            value={source.part_selected}
                            onChange={handleChangePart}
                            input={<Input/>}
                            disabled={(source.file_selected === "CBD" || source.file_selected === "supplier selection")}
                            renderValue={selected => (selected as string[]).join(', ')}
                            MenuProps={MenuProps}
                        >
                            {source.part_available.map(part => (
                                <MenuItem key={part} value={part}>
                                    <Checkbox checked={source.part_selected.indexOf(part) > -1}/>
                                    <ListItemText primary={part}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/*Button*/}
                <Grid item xs={12}>
                    {/*  download btn */}
                    <Button variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.button}
                            startIcon={<GetAppIcon/>}
                            onClick={fileDownload}>
                        Download
                    </Button>
                </Grid>

                {/* helper show board */}
                {/*<h3>project: {source.project}</h3>*/}
                {/*<h3>vendor selected: {source.vendor_selected}</h3>*/}
                {/*<h3>parts available: {source.part_available}</h3>*/}
                {/*<h3>parts selected: {source.part_selected}</h3>*/}
                {/*<h3>file: {source.file_selected}</h3>*/}


            </form>
        </Fragment>
    )
}

