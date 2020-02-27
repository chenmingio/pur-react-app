import React, {ChangeEvent, Fragment, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// what is the props' type
// interface SearchProjectProps

export const SearchProject = (props:any) => {

    const searchProject = props.searchProject

    const [open, setOpen] = useState(true)
    const [projectID, setProjectID] = useState("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setProjectID(value)
    }

    const handleClick_searchProject = () => {
        searchProject(projectID)
        setOpen(false)
    };


    return (
        <Fragment>
            <Dialog open={open}>
                <DialogTitle>Enter Project ID</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Project ID"
                        autoFocus
                        required={true}
                        onChange={handleChange}
                        value={projectID}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick_searchProject} color="secondary">
                        Search
                    </Button>
                    <Button onClick={()=>setOpen(false)} color="inherit">
                        Create New
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}