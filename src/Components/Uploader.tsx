import React, {Fragment, useState} from "react"
// import {Upload, Button, Icon} from "antd"
import Typography from "@material-ui/core/Typography";

const url = `http://${document.domain}:${8080}`


export const Uploader = () => {

    const [msg, setMsg] = useState("")

    const props = {
        name: 'file',
        action: `${url}/upload`,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                setMsg("uploading")
            }
            if (info.file.status === 'done') {
                setMsg("upload done")
            } else if (info.file.status === 'error') {
                setMsg("upload failed")
            }
        }
    }


    return (
        <Fragment>
            {/*<Upload {...props}>*/}
            {/*    <Button>*/}
            {/*        <Icon type="upload"/> Click to Upload*/}
            {/*    </Button>*/}
            {/*</Upload>*/}
            <Typography variant="h6" color="inherit">
                {msg}
            </Typography>
        </Fragment>
    )
}