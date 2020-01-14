import React from 'react';
import { Typography } from '@material-ui/core';

import Job from './Job';

export default function Jobs({ jobs }) {

    console.log(jobs[0]);

    return (
        <div className='jobs'>
            <Typography variant='h4' component="h1">
                Entry Level Software Jobs
            </Typography>
            {
                jobs.map(
                    (job, i) => <Job job={job} key={i} />
                )
            }
        </div>
    );
}