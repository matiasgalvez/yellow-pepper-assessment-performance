import http from 'k6/http';
import {sleep, check} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const requestBody = {
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }

export const options = {
    stages: [
        { duration: '15s', target: 1000 }, //ramp up
        { duration: '30s', target: 1000 }, //stable
        { duration: '15s', target: 5000 }, //ramp up
        { duration: '30s', target: 5000 }, //stable
        { duration: '15s', target: 10000 }, //ramp up
        { duration: '30s', target: 10000 }, //stable
        { duration: '30s', target: 0 } //ramp down to 0 

    ]
}

export default function () {
    const res = http.post(`http://localhost:8080/api/v3/pet`, JSON.stringify(requestBody), {
        headers: { 'Content-Type': 'application/json' },
      });
      sleep(1);
      check(res, { '200': (r) => r.status === 200});
}

export function handleSummary(data) {
    return {
      "./testResults/heavyStressTestSummary.html": htmlReport(data)
    };
}