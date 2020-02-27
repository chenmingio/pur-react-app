import React from 'react'

import {RouteComponentProps} from 'react-router-dom'
import * as WebDataRocks from "./webdatarocks/webdatarocks.react";
import "webdatarocks/webdatarocks.css";

interface ProjectReportProps extends RouteComponentProps {
}


export const ProjectReport = (props: ProjectReportProps) => {

    // WebDataRock
    const ref: React.RefObject<WebDataRocks.Pivot> = React.useRef<WebDataRocks.Pivot>(null);

    const onReportComplete = () => {
        if (ref.current && ref.current.webdatarocks) {
            ref.current.webdatarocks.off("reportcomplete");
            console.log(ref.current.webdatarocks);
        }
    }

    const url = `http://${document.domain}:${8080}/downloads/report.json`


    return (
        <div className="App">
            <WebDataRocks.Pivot ref={ref} toolbar={true} width="100%" reportcomplete={() => onReportComplete()}
                                report={url}></WebDataRocks.Pivot>
        </div>
    )
}