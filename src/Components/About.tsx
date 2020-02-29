import React from 'react'
import {Grid, Link} from "@material-ui/core";

export const About = () => {
    return (
        <Grid container>
            <p>This Web App is just demo.</p>
            <p>We use it to explore the possibility of digitisation in purchasing function.</p>
            <p>If you have new idea, suggestion or bug report, email to:
                <Link href="mailto: ming.chen@hella.com">
                 ming.chen@hella.com.
                </Link>
            </p>
        </Grid>
    )
}