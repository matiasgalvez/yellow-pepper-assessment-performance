import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 2000 }, //ramp up
        { duration: '1m', target: 2000 }, //stable
        { duration: '30s', target: 0 }
    ]
}

export default function () {
    const res = http.get('https://test.k6.io');
    sleep(1);
    check(res, { '200': (r) => r.status === 200});
}