import React, {ReactElement} from "react";
import {RouteComponentProps} from 'react-router-dom'
import {ProjectInput} from "./components/projectSingle/ProjectInput";
import {ProjectReport} from "./components/projectReport/ProjectReport";
import {SourcingDoc} from "./components/SourcingDoc";
import {Uploader} from "./components/Uploader";
import {About} from "./components/About";
import {QuickSearch} from "./components/QuickSearch";
import DescriptionIcon from '@material-ui/icons/Description';
import PublishIcon from '@material-ui/icons/Publish';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircle from "@material-ui/icons/Mail";
import {LogisticsDashboard} from "./components/logisticsDashboard/LogisticsDashboard";

export type page = {
    name: string
    path: string
    icon: ReactElement
    component: (props: RouteComponentProps) => ReactElement
}

export const pages: page[] = [
    {
        path: `/search`,
        name: 'Quick Search',
        icon: <SearchIcon/>,
        component: QuickSearch
    },
    {
        path: '/sourcing_doc',
        name: "Sourcing Document",
        icon: <DescriptionIcon/>,
        component: SourcingDoc
    },
    {
        path: `/logistics_dashboard`,
        name: 'Logistics Dashboard',
        icon: <DashboardIcon/>,
        component: LogisticsDashboard
    },
    {
        path: `/project`,
        name: 'Project Info',
        icon: <AddCircle/>,
        component: ProjectInput
    },
    {
        path: '/project_report',
        name: 'Project Report',
        icon: <EqualizerIcon/>,
        component: ProjectReport
    },
    // {
    //     path: '/upload',
    //     name: "Data Upload",
    //     icon: <PublishIcon/>,
    //     component: Uploader
    // },
    {
        path: '/tutorial',
        name: "Tutorial",
        icon: <PlayCircleOutlineIcon/>,
        component: About
    },
    {
        path: `/`,
        name: 'About App',
        icon: <ListIcon/>,
        component: About
    },
]
