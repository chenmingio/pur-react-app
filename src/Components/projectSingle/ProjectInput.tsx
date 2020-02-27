import React, {ChangeEvent, Fragment, ReactElement, useState} from 'react';
import axios from 'axios';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
    MenuItem,
    Typography,
    Divider,
    Button,
    ButtonGroup, Box
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import {Grid, TextField} from "@material-ui/core";
import {SearchProject} from "./SearchProject";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield_basic: {
            margin: theme.spacing(1, 3),
            width: 200,
        },
        textfield_small: {
            margin: theme.spacing(1, 3),
            width: 100,
        },
        divider_basic: {
            margin: theme.spacing(5, 2),
        },
        divider_small: {
            margin: theme.spacing(1, 2),
        },
        subtitle: {
            margin: theme.spacing(0, 3),
        },
        subtitle_part: {
            margin: theme.spacing(3, 3),
        },
        button: {
            margin: theme.spacing(5, 3),
        }
    }),
);


// interface ProjectSingleProps extends RouteComponentProps {
// }


// props to control each input element
type TextFieldProps = {
    id?: number
    name: string
    label: string
    required?: boolean
    select?: boolean
    type?: string
    selectItem?: ReactElement[]
    value?: string | number | boolean
}

type Part = {
    part: string
    part_description: string
    usage: number | string
    target_price: number | string
    target_invest: number | string
    sourcing_date: string
    t1_date: string
    t2_date: string
    t3_date: string
    pv_date: string
    ppap_date: string
    project: string
    [propName: string]: string | number // [propName:string] string here means: all fields are string?
    // [propName: number]: string | number | null

}

// use to store name:value tuple between server and view. Name it "project" object.
// all these fields/keys are mandatory
type ProjectProps = {
    product_group: string
    project_name: string
    customer: string
    car: string
    mdb_status: string
    project_status: string
    project: string
    dd_location: string
    production_line: string
    fg_part_number: string
    production_cycle_time: number | string
    budget_available: string

    // timing
    sop_hella_date: string
    run_rate_hella_date: string
    pv_hella_date: string
    sop_customer_date: string

    // team
    pjm: string
    pur: string
    md: string
    controlling: string
    sqa: string
    logistic: string
    me: string

    // volume
    volume_list: (number | string)[]

    // parts
    part_list: Part[]
}

const initPart: Part = {
    part: "",
    part_description: "",
    usage: "",
    target_price: "",
    target_invest: "",
    sourcing_date: "",
    t1_date: "",
    t2_date: "",
    t3_date: "",
    pv_date: "",
    ppap_date: "",
    project: "",
}


const initProject: ProjectProps = {
    product_group: "",
    project_name: "",
    customer: "",
    car: "",
    mdb_status: "",
    project_status: "",
    project: "",
    dd_location: "",
    production_line: "",
    fg_part_number: "",
    production_cycle_time: "",
    budget_available: "",

    // timing
    sop_hella_date: "",
    run_rate_hella_date: "",
    pv_hella_date: "",
    sop_customer_date: "",

    // team
    pjm: "",
    pur: "",
    md: "",
    controlling: "",
    sqa: "",
    logistic: "",
    me: "",

    // volume
    volume_list: Array(3).fill(""),

    // part
    part_list: [initPart],
}


export const ProjectInput = () => {

    const classes = useStyles();

    const [project, setProject] = useState(initProject)

    // ============= change handler function ==========
    // normal TextField handler
    const handleChange_normalTextField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        console.log(`[handle input change]: name=${name}, value=${value}`)
        setProject({
            ...project,
            [name]: value
        })
        console.log(`[handle input change]: now project info is ${JSON.stringify(project)}`)
    }

    // volume list handler
    const handleChange_volumeTextField = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target //use name(same as key) as index for searching in volume list. Deep clone.
        let clone_list: (number | string)[] = [...project.volume_list]
        clone_list[parseInt(name)] = parseInt(value)
        setProject({
            ...project,
            volume_list: clone_list
        })
    }

    //TODO limit the input that project/part is not null

    // handle part value update
    const handleChange_Part = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value, id} = event.target
        // console.log(`>>> part input name is: ${name}`)
        // console.log(`>>> part input value is: ${value}`)
        // console.log(`>>> part input id is: ${id}`)
        const index = parseInt(id)
        //use id(same as key) as index for part searching in part list. Deep clone.
        let clone_part = JSON.parse(JSON.stringify(project.part_list[index]))
        // console.log(`>>> clone part is: ${JSON.stringify(clone_part)}`)

        // use name to update the target attribute
        clone_part[name] = value
        // deep clone the whole part_list
        let clone_part_list = JSON.parse(JSON.stringify(project.part_list))
        // replace the part in clone_part_list with clone_part
        clone_part_list[index] = clone_part
        // console.log(`>>> clone part value is: ${clone_part}`)
        // replace the real part_list with clone_part_list
        setProject({
            ...project,
            part_list: clone_part_list
        })
    }

    // add year handler
    const handleClick_addYear = () => {
        let new_volume_list = [...project.volume_list]
        new_volume_list.push("")
        setProject({
            ...project,
            volume_list: new_volume_list
        })
    }

    // remove year handler
    const handleClick_removeYear = () => {
        let new_volume_list = [...project.volume_list]
        new_volume_list.pop()
        setProject({
            ...project,
            volume_list: new_volume_list
        })
    }

    // add part handler
    const handleClick_addPart = () => {
        // deep clone a new part
        const copy_part = JSON.parse(JSON.stringify(initPart))
        // deep clone the new part list
        let new_part_list = JSON.parse(JSON.stringify(project.part_list))
        new_part_list.push(copy_part)

        setProject({
            ...project,
            part_list: new_part_list
        })
    }

    // remove part handler
    const handleClick_removePart = () => {
        // deep clone a new part list
        let new_part_list = JSON.parse(JSON.stringify(project.part_list))
        // pop out the last one
        new_part_list.pop()
        setProject({
            ...project,
            part_list: new_part_list
        })
    }


    // =========== data preparing ============

    // Selector Option for MDB status
    const option_MDB: string[] = [
        "New",
        "Can",
        "Must",
        "ORDER",
        "No Go",
    ]

    const option_project_status: string[] = [
        "Acquisition",
        "Nomination",
        "Lost",
        "On Hold",
        "OtD",
        "TtM",
    ]

    const option_BudgetAvailable: string[] = [
        "Available",
        "Not Yet"
    ]


    const SelectMaker = (options: string[]) =>
        options.map(
            (option: string, key: number) =>
                <MenuItem key={key} value={option}>
                    {option}
                </MenuItem>
        )

    const select_MDB = SelectMaker(option_MDB)
    const select_project_status = SelectMaker(option_project_status)
    const select_BudgetAvailable = SelectMaker(option_BudgetAvailable)


// Behaviour Setting of Input TextField
    const TextFieldList_Basic: TextFieldProps[] = [
        {
            name: "project",
            label: "Project No.",
            value: project.project
        },
        {
            name: "project_name",
            label: "Project Name",
            required: true,
            value: project.project_name,
        },
        {
            name: "product_group",
            label: "Product Group",
            required: true,
            value: project.product_group,
        },
        {
            name: "customer",
            label: "Customer",
            required: true,
            value: project.customer,
        },
        {
            name: "car",
            label: "Car",
            required: true,
            value: project.car,
        },
        {
            name: "mdb_status",
            label: "MDB Status",
            required: true,
            select: true,
            selectItem: select_MDB,
            value: project.mdb_status,
        },
        {
            name: "project_status",
            label: "Project Status",
            select: true,
            selectItem: select_project_status,
            value: project.project_status,
        },

        {
            name: "dd_location",
            label: "D&D Location",
            value: project.dd_location,
        },
        {
            name: "production_line",
            label: "Production Line",
            value: project.production_line,
        },
        {
            name: "fg_part_number",
            label: "FG Part Number",
            value: project.fg_part_number,
        },
        {
            name: "production_cycle_time",
            label: "Production Cycle Time",
            value: project.production_cycle_time,
            type: "number"
        },
        {
            name: "budget_available",
            label: "Budget Available",
            select: true,
            selectItem: select_BudgetAvailable,
            value: project.budget_available,
        },]


    const TextFieldList_Timing: TextFieldProps[] = [
        {
            name: "sop_hella_date",
            label: "SOP Hella",
            required: true,
            value: project.sop_hella_date,
            type: "date"
        },
        {
            name: "run_rate_hella_date",
            label: "Run@Rate Hella",
            value: project.run_rate_hella_date,
            type: "date"

        },
        {
            name: "pv_hella_date",
            label: "PV Hella",
            value: project.pv_hella_date,
            type: "date"

        },
        {
            name: "sop_customer_date",
            label: "SOP Customer",
            value: project.sop_customer_date,
            type: "date"
        },
    ]

    const TextFieldList_Team: TextFieldProps[] = [
        {
            name: "pjm",
            label: "PJM",
            required: true,
            value: project.pjm,
        },
        {
            name: "pur",
            label: "PUR",
            required: true,
            value: project.pur,
        },
        {
            name: "md",
            label: "MD",
            required: true,
            value: project.md,
        },
        {
            name: "controlling",
            label: "Controlling",
            required: true,
            value: project.controlling,
        },
        {
            name: "sqa",
            label: "SQA",
            value: project.sqa,
        },
        {
            name: "logistic",
            label: "Logistic",
            value: project.logistic,
        },
        {
            name: "me",
            label: "ME",
            value: project.me,
        },
    ]

    const TextFieldList_Part: TextFieldProps[] = [
        {
            name: "part",
            label: "Part No.",
        },
        {
            name: "part_description",
            label: "Part Description ",
        },
        {
            name: "usage",
            label: "Usage",
            type: "number",
        },
        {
            name: "sourcing_date",
            label: "Sourcing Date",
            type: "date",
        },
        {
            name: "t1_date",
            label: "T1 Date",
            type: "date",
        },
        {
            name: "t2_date",
            label: "T2 Date",
            type: "date",
        },
        {
            name: "t3_date",
            label: "T3 Date",
            type: "date"
        },
        {
            name: "pv_date",
            label: "PV Date",
            type: "date"
        },
        {
            name: "ppap_date",
            label: "PPAP Date",
            type: "date"
        },
    ]

// Function to build normal TextField
    const ElementListMaker_TextField = (TextFieldList: TextFieldProps[]) =>
        TextFieldList.map(
            function mapProject(textField: TextFieldProps, key: number) {
                return (
                    <TextField
                        key={key}
                        name={textField.name}
                        // substring the date + replace null to ""
                        value={(textField.type === "date" && typeof (textField.value) === "string") ? textField.value.substring(0, 10) : (textField.value || "")}
                        type={textField.type}
                        select={textField.select}
                        label={textField.label}
                        required={textField.required}
                        InputLabelProps={{
                            shrink: (textField.type === "date") ? true : undefined,
                        }}
                        className={classes.textfield_basic}
                        onChange={handleChange_normalTextField}
                    >{textField.selectItem}
                    </TextField>
                )
            }
        )

    const ElementList_TextField_Basic = ElementListMaker_TextField(TextFieldList_Basic)
    const ElementList_TextField_Team = ElementListMaker_TextField(TextFieldList_Team)
    const ElementList_DateTextField_Project = ElementListMaker_TextField(TextFieldList_Timing)


    // Function to build little TextField for Yearly Volume
    const ElementListMaker_NumTextField = (Numbers: (number | string)[]) =>
        Numbers.map(
            function mapNumber(num: number | string, key: number) {
                return (
                    <TextField
                        key={key}
                        type="number"
                        name={key.toString()} //use name as index to position the number in list. used to be id but give it to Part element
                        value={project.volume_list[key]}
                        // name={`volume_${key.toString()}`}
                        label={`Year ${(key + 1).toString()}`}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        className={classes.textfield_small}
                        // change value should goto project.vol with position index
                        onChange={handleChange_volumeTextField}

                    />
                )
            }
        )

    const ElementList_NumTextField_Volume = ElementListMaker_NumTextField(project.volume_list)


    // Function to build special Textfield for single part (mainly handleChange logic is different)
    const ElementListMaker_TextField_Part = (textFieldList_Part: TextFieldProps[], part_index: number) =>
        textFieldList_Part.map(
            function mapTextFieldList_Part(textField_Part: TextFieldProps, key: number) {
                const propName: string = textField_Part.name
                const targetPart: Part = project.part_list[part_index]
                return (
                    <TextField
                        key={key}
                        id={part_index.toString()}
                        name={propName}
                        value={targetPart[propName]}
                        label={textField_Part.label}
                        type={textField_Part.type}
                        InputLabelProps={{
                            shrink: (textField_Part.type === "date") ? true : undefined,
                        }}
                        className={classes.textfield_basic}
                        onChange={handleChange_Part}
                    />
                )
            }
        )


    // function to assemble Part Textfield
    const ElementListMakerCombi_Part = (partList: Part[]) =>
        partList.map(
            function mapPartList(part: Part, key: number) {
                return (
                    <Fragment key={key}>
                        <Grid item xs={1} className={classes.subtitle_part}>
                            <Box component={"h6"} bgcolor="secondary.main" color="primary.contrastText" p={1}>
                                Part {key + 1}
                            </Box>
                        </Grid>
                        {ElementListMaker_TextField_Part(TextFieldList_Part, key)}
                        {/*use key to indicate which part*/}
                    </Fragment>
                )
            }
        )

    const ElementListCombi_Part = ElementListMakerCombi_Part(project.part_list)

    // single number input for lifetime
    const ButtonGroup_Lifetime =
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={handleClick_removeYear}>Year -</Button>
            <Button onClick={handleClick_addYear}>Year +</Button>
        </ButtonGroup>

    // single number input for part
    const ButtonGroup_Part =
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={handleClick_removePart}>Part -</Button>
            <Button onClick={handleClick_addPart}>Part +</Button>
        </ButtonGroup>

// data change btw server
    const url = `http://${document.domain}:${8080}`


    const saveProject = () => {
        //TODO check project id is not null

        // send project to server with POST
        const url_string = `${url}/project/new/info`
        console.log(`[create project] at ${url_string}`)
        axios({
            url: url_string,
            method: "POST",
            params: project
        }).then(response => {
            //TODO give user a feedback
            console.log(`[save project] response: ${response}`)
        }).catch(err => {
            console.log(`[save project] error: ${err}`)
        })
    }


    const deleteProject = () => {
        //TODO check project id is not null

        // send project to server with POST
        const url_string = `${url}/project/${project.project}/info`
        console.log(`[delete project] at ${url_string}`)
        axios({
            url: url_string,
            method: "delete",
        }).then(response => {
            //TODO give user a feedback
            console.log(`[delete project] response: ${response.data}`)
        }).catch(err => {
            console.log(`[delete project] error: ${err}`)
        })
    }


    const searchProject = (projectID: string) => {
        //TODO check project id is not null

        const url_string = `${url}/project/${projectID}/info`
        console.log(`[search project] at ${url_string}`)
        axios({
            url: url_string,
            method: "get",
        }).then(response => {
            //TODO give user a feedback
            console.log(`[search project] response: ${JSON.stringify(response)}`)
            set_project_with_response(response.data)
        }).catch(err => {
            console.log(`[search project] error: ${err}`)
        })
    }

    const set_project_with_response = (data: {}) => {
        // const new_project = Object.assign({}, data)
        // for (let [key, value] of Object.entries(data)) {
        //     if (value = null) {}
        // }
        setProject({
            ...project,
            ...data,
        })
    }


    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box component={"h2"} bgcolor="secondary.main" color="primary.contrastText" p={2}>
                        Project Info
                    </Box>
                </Grid>

                <form noValidate autoComplete="off">
                    <SearchProject searchProject={searchProject}/>
                    <Typography className={classes.subtitle} variant="h6" color={"primary"}>
                        Basic
                    </Typography>
                    {ElementList_TextField_Basic}
                    <Divider className={classes.divider_basic}/>
                    <Typography className={classes.subtitle} variant="h6" color={"primary"}>
                        Timing
                    </Typography>
                    {ElementList_DateTextField_Project}
                    <Divider className={classes.divider_basic}/>
                    <Typography className={classes.subtitle} variant="h6" color={"primary"}>
                        Team
                    </Typography>
                    {ElementList_TextField_Team}
                    <Divider className={classes.divider_basic}/>
                    {/*Volumes*/}
                    <Grid item xs={12}>
                        <Typography className={classes.subtitle} variant="h6" color={"primary"}
                                    display={"inline"}>
                            Volume
                        </Typography>
                        {ButtonGroup_Lifetime}
                    </Grid>
                    {ElementList_NumTextField_Volume}
                    <Divider className={classes.divider_basic}/>
                    {/*Parts*/}
                    <Grid item xs={12}>
                        <Typography className={classes.subtitle} variant="h6" color={"primary"}
                                    display={"inline"}>
                            Part
                        </Typography>
                        {ButtonGroup_Part}
                    </Grid>
                    {ElementListCombi_Part}
                    <Divider className={classes.divider_basic}/>
                    <Grid container justify={"center"}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            onClick={saveProject}
                        >
                            Save Project
                        </Button>

                        <Button
                            variant="contained"
                            color="inherit"
                            size="large"
                            className={classes.button}
                            startIcon={<DeleteIcon/>}
                            onClick={deleteProject}
                        >
                            Delete Project
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Fragment>
    )
}



