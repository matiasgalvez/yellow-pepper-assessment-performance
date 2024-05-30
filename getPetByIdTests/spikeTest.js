import http from 'k6/http';
import {sleep, check} from 'k6';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const options = {
    stages: [
        { duration: '30s', target: 23000 }, //ramp up 10000=390 CPU Usage 15000 = 400 cpu usage and 98% correct requests 20000=530 CPU USAGE and 94% correct requests 25000 breaks
                                            //22000 403 CPU Usage 93% requests 23000 540 cpu 93% requests
        { duration: '45s', target: 23000 }, //stable
        { duration: '30s', target: 0 } //ramp down to 0
    ]
}

export default function () {
    const res = http.get(`http://localhost:8080/api/v3/pet/${getRandomInt(1,10)}`);
    sleep(1);
    check(res, { '200': (r) => r.status === 200});
}