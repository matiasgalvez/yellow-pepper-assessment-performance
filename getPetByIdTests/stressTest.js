import http from 'k6/http';
import {sleep, check} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const options = {
    stages: [
        { duration: '30s', target: 200 }, //ramp up
        { duration: '45s', target: 200 }, //stable
        { duration: '30s', target: 800 }, //ramp up
        { duration: '45s', target: 800 }, //stable
        { duration: '30s', target: 1000 }, //ramp up
        { duration: '45s', target: 1000 }, //stable
        { duration: '45s', target: 0 } //ramp down to 0 

    ]
}

export default function () {
    const res =   http.get(`http://localhost:8080/api/v3/pet/${getRandomInt(1,10)}`);
    sleep(1);
    check(res, { '200': (r) => r.status === 200});
}

export function handleSummary(data) {
    return {
      "./testResults/stressTestSummary.html": htmlReport(data)
    };
};