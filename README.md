Devices management
==================

This is Proof of concept of management over SSH of 1000 devices

Usage
=====

- Install node
- clone the repo:
    `git clone https://github.com/syzer/devices-management.git`
- `npm install`
- start 3 tests servers using:
`node server1 & node server2 & node server3`
- or start 1 test server using
`npm start`
but beware the single server might not withstand 1000 simultaneous connections :)

and in other terminal:
- npm `test`



Benchmark notes:
================
client
------
Ram usage is < 100 Mb

SSh servers
-----------
simulated servers take: 3x100Mb RAM
They are just for test, so small memory leaks are possible.

Runtime: on slow (400$) machine is ~80 sec

Why
===

Doable
Use of async and non blocking IO.
