import React from 'react';
import './App.css';

import Jobs from './Jobs';

const JOB_API_URL = "http://localhost:3001/jobs";

// const mock = [
//   {title: 'swe 1', company: 'Google'},
//   {title: 'swe 1', company: 'Facebook'},
//   {title: 'swe 1', company: 'Apple'},

// ];

async function fetchJobs(updateCb){
  const res = await fetch(JOB_API_URL);
  const jobs = await res.json();
  updateCb(jobs);
  console.log({jobs});
}

function App() {

  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
