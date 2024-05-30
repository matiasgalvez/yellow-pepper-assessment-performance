import http from 'k6/http';
import {sleep, check} from 'k6';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const options = {
    stages: [
        { duration: '15s', target: 250 }, //ramp up
        { duration: '20s', target: 250 }, //stable
        { duration: '15s', target: 0 } //ramp down to 0 
    ]
}

export default function () {
    const res =   http.get(`http://localhost:8080/api/v3/pet/${getRandomInt(1,10)}`);    ;
    sleep(1);
    check(res, { '200': (r) => r.status === 200});
}