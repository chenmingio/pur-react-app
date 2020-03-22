import React from 'react'
import {Grid, Link} from "@material-ui/core";

export const About = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <p>This Web App is just demo. IE11 is supported. Win10 built-in browser Edge is faster.</p>
            </Grid>
            <Grid item>
                <p> {"If you have any new idea, suggestion or bug report, email to "}
                    <Link href="mailto: ming.chen@hella.com">
                        ming.chen@hella.com.
                    </Link>
                </p>
            </Grid>
        </Grid>
    )
}