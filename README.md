# yellow-pepper-assessment-performance

This is an automation project using k6 for the creation of a Performance Testing framework to test the performance of the APIs exposed by [Swagger PetStore Project](https://github.com/swagger-api/swagger-petstore) running in a local environment.

***

## Languages & Frameworks

This project uses the following languages and frameworks:

* [K6](https://k6.io/) as load testing framework.
* [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript) as programming language.

***

## Prerequisites:

1. Install [K6](https://k6.io/docs/get-started/installation/).
2. Install [GIT](https://git-scm.com).
3. Run [Swagger PetStore Project](https://github.com/swagger-api/swagger-petstore) locally.

## Test Analysis

**Scope and Test Cases**:

Main scope is to put the apis under different loads to see how they respond by checking key performance metrics, which are:

***Response Time***

Measures the total time it takes a system to respond to a user request.

***Average Response Time***

Represents the typical response time the user will experience.

***95th Percentile***

Represents the time required for 95% of requests to be completed successfully.

***Throughput***

Measures the number of requests that can be processed by a system in a given time.
Total number of requests divided by total time taken.

***Error Percentage***

Measures the percentage of requests that failed or didn't receiv a response. It identifies the issues and bottlenecks that affect the performance.

***CPU Utilization***

Measures the percentage of CPU capacity utilized while processing the requests. Identifies possible bottlenecks when nearing full utilization.

**

The following tests will be conducted for each request type endpoint:

***Load Test***

This test is conducted to see how the api responds under an average load of parallel requests in an average amount of time.

***Stress Test***

This test is conducted to see how the api responds under a heavily increased load to test its limits in an average amount of time.

***Spike Test***

This test is conducted to see how the api responds under an extreme load in a short period of time (ramp up of traffic that quickly dies down) to check the api reliability.


### **Test Result Analysis**

All tests can be run by issuing the following command in a terminal
`k6 run <test-file>` for example, standing at the root of the project, the following command will run a load test for the Get Pet By ID API `k6 run getPetByIdTests/loadTest.js`
All tests generate an html report in the corresponding testResults folder with the test name.
An html report is already provided for each test for the purpose of this analysis.

***Get Pet By ID Endpoint***

After carefully analysing each report, we can see that:
For 100 requests done in parallel by 10 users we have an average response time of 1 second averaging 10 requests/second. With no failed requests.
And 20% cpu usage out of 1600%.
This is the average use this api would be given, and we see no bottlenecks or potential issues here.

In a heavy stress test over an average period of time we see that a total of 778451 requests were made with an average response time of 1s, with a throughput of 4692 requests per second, with no failed requests. That combined with 10000 concurrent users and a CPU usage of 390% out of 1600% we still see no bottleneck when the heavy load ramps up slowly.

In the spike test is where we see the performance starting to be affected, we quickly ramp up the concurrent users to 23000 to end up with 645107 total requests out of which 32317 have failed. So we now have a request error rate of 5% and an average response time of 7s (seven times the average) which would greatly affect user experience. Together with a CPU Usage of 540% we now see a clear bottleneck resulting in request failures and long response times to put up with concurrent users.

In conclusion, this GET api responds correctly under regular loads and heavy loads when done over time. But when its put under a really heavy load in a really short amount of time (i.e a DDoS attack) it has a high error rate and a long response time, reducing its availability to the users and highly reducing its performance as well. This gives the API good scalability but vulnerability to attacks. So security would be the main concern for this API in the long run.

***Post Pet Endpoint***

After carefully analysing each report, we can see that:
For a 100 requests done in parallel by 10 users we have an average response time of 1 second averaging 9.79 requests per second. Up until here we see no issues, but out of 100 requests done we have 1 request failure, which turns into a 1% error rate in the average use of the API. This together with a CPU usage of 200% out of 1600% we see no bottleneck but possible API unstability.

In a heavy stress test over an average period of time we see that a total of 612015 requests were madewith an average response time of 3s, with a throughput of 3689.42 requests per second. This is done with 10000 concurrent users, we are already starting to see the performance being highly affected. Together with 160347 Failed Requests that turn into an Error Rate of 26% with a CPU usage of 667% out of 1600% we see a bottleneck that causes the API to be available only 74% of the time, which can greatly affect user experience.

In a spike test we see an even greater loss of perfomance but a little more availability. With 23000 concurrent users that quickly ramp up, getting up to 548408 total requests out of which 120206 have failed, which turns into an Error Rate of 21.91%. This combined with an average response time of 7.6 seconds (seven times the average) and a CPU usage of 900% makes the API really unstable, greatly affecting user experience.

In conclusion, this POST api responds relatively well to average loads. But doesn't respond well to heavy loads over average time, or heavy loads in a short amount of time. We have an overall high unstability and low availability, which results in really low scalability and poor user experience. In the long run, code refactoring, performance and security wwill have to be worked on in the long run.
