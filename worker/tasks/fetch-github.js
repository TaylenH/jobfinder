let fetch = require('node-fetch');
let redis = require('redis');

let client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);


const baseURL = "https://jobs.github.com/positions.json";

async function fetchGithub() {
    let resultCount = 1;
    let onPage = 0;
    let allJobs = [];

    //fetch all pages
    while(resultCount > 0){
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        console.log(jobs.length);
        resultCount = jobs.length;
        onPage++;
    }

    //filter algo
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        //algo logic
        if (
            jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('architect')
        ) {
            return false;
        }

        return true;
    })
    console.log('got', allJobs.length, 'jobs');
    console.log("filtered down to", jrJobs.length);

    //set in redis
    const success = await setAsync('Github', JSON.stringify(jrJobs));
    console.log(success);
}

// fetchGithub();

module.exports = fetchGithub;