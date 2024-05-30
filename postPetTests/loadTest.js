import http from 'k6/http';
import {sleep, check} from 'k6';

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
        { duration: '15s', target: 250 }, //ramp up
        { duration: '20s', target: 250 }, //stable
        { duration: '15s', target: 0 } //ramp down to 0 
    ]
}

export default function () {
    const res = http.post(`http://localhost:8080/api/v3/pet`, JSON.stringify(requestBody), {
        headers: { 'Content-Type': 'application/json' },
      });
      sleep(1);
      check(res, { '200': (r) => r.status === 200});
      console.log(res)
}