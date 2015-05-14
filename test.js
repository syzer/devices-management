/**
 * Created by syzer on 5/13/2015.
 */
var q = require('bluebird');
var exec = require('node-ssh-exec');
var execAsync = q.promisify(exec);
var assert = require('assert');

var CONNECTIONS_NO = 1000;
var command = 'ls -alh';

console.time('microBenchmark');

// prepare workflow
var todos = Array.apply(null, {length: CONNECTIONS_NO})
    .map(function (el, i) {
        var port = 22 + Math.floor(Math.random() * 3);
        return execAsync({
            host: '127.0.0.1',
            port: port,
            username: 'foo',
            password: 'bar',
            readyTimeout: 99999
        }, command)
            .catch(function (err) {
                return console.warn('failed', i);
            });
    });

q.all(todos)
    .then(function (res) {
        console.log(res.length);
        console.timeEnd('microBenchmark');
        return assert(CONNECTIONS_NO, res.length);
    })
    .catch(function (err) {
        return console.warn(err);
    });

console.log('Hey!.. nothing is blocked!');

setTimeout(function () {
    console.log("Seriously I'm not blocked .. could serve web pages.. or sth..")
}, 5000);
