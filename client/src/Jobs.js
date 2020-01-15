import React from 'react';
import { Typography, MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Job from './Job';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1
    },
});

export default function Jobs({ jobs }) {

    console.log(jobs[0]);

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const numJobs = jobs.length;
    const numPages = Math.floor(numJobs / 50) + 1;

    // step == 0, show 0-49
    // step == 1, show 50-99

    function handleNext(){
        setActiveStep(prevActiveStep => prevActiveStep+1);
    }

    function handleBack(){
        setActiveStep(prevActiveStep => prevActiveStep-1);
    }

    return (
        <div>
            <div className='jobs'>
                <Typography variant='h4' component="h1">
                    Entry Level Software Jobs
                </Typography>
                <Typography variant='h6' component='h2'>
                    Found {numJobs} Jobs
                </Typography>
                {
                    jobs.map(
                        (job, i) => <Job job={job} key={i} />
                    )
                }
            </div>
            <div>
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                    variant="progress"
                    steps={numPages}
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