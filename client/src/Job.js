import React from 'react';
import { Typography, Paper, MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1
    },
});

export default function Job({ job }){
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    function handleNext(){
        setActiveStep(prevActiveStep => prevActiveStep+1);
    }

    function handleBack(){
        setActiveStep(prevActiveStep => prevActiveStep-1);
    }

    return (
        <div>
            <Paper className="job">
                <div>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant='h5'>{job.company}</Typography>
                    <Typography>{job.location}</Typography>
                </div>
                <div>
                    <Typography>{job.created_at.split(' ').slice(0, 3).join(' ')}</Typography>
                </div>
            </Paper>
            <MobileStepper
                variant="progress"
                steps={6}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );  
}


{/* <Paper className="job">
            <div>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant='h5'>{job.company}</Typography>
                <Typography>{job.location}</Typography>
            </div>
            <div>
                <Typography>{job.created_at.split(' ').slice(0, 3).join(' ')}</Typography>
            </div>
        </Paper> */}