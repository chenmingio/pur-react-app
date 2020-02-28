import React, {ReactElement} from "react";
import AddCircle from "@material-ui/icons/Mail";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import {ProjectInput} from "./components/projectSingle/ProjectInput";
import {ProjectReport} from "./components/projectReport/ProjectReport";
import {SourcingDoc} from "./components/SourcingDoc";
import {RouteComponentProps} from 'react-router-dom'
import DescriptionIcon from '@material-ui/icons/Description';
import PublishIcon from '@material-ui/icons/Publish';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Uploader} from "./components/Uploader";

export type page = {
    name: string
    path: string
    icon: ReactElement
    component: (props: RouteComponentProps) => ReactElement
}

export const pages: page[] = [
    {
        path: `/project`,
        name: 'Project Info',
        icon: <AddCircle/>,
        component: ProjectInput
    },
    {
        path: '/project_report',
        name: 'Project Report',
        icon: <FormatListBulletedIcon/>,
        component: ProjectReport
    },
    {
        path: '/sourcing_doc',
        name: "Sourcing Document",
        icon: <DescriptionIcon/>,
        component: SourcingDoc
    },
    {
        path: '/upload',
        name: "Data Upload",
        icon: <PublishIcon/>,
        component: Uploader
    },
    {
        path: '/tutorial',
        name: "Tutorial",
        icon: <PlayCircleOutlineIcon/>,
        component: SourcingDoc
    },
]
