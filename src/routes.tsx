import React, {ReactElement} from "react";
import AddCircle from "@material-ui/icons/Mail";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {ProjectInput} from "./components/projectSingle/ProjectInput";
import {ProjectReport} from "./components/projectReport/ProjectReport";
import {SourcingDoc} from "./components/SourcingDoc";
import {RouteComponentProps} from 'react-router-dom'


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
        icon: <InboxIcon/>,
        component: SourcingDoc
    },
]
