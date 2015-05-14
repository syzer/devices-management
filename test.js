/**
 * Created by syzer on 5/13/2015.
 */
var q = require('bluebird');
var exec = require('node-ssh-exec');
var execAsync = q.promisify(exec);
var command = 'ls -alh';
var assert = require('assert');
var CONNECTIONS_NO = 1000;

console.time('microBenchmark');

// AKA unfold
var todos = [];
for (var i = 0; i < CONNECTIONS_NO; i++) {
    var port = 22 + Math.floor(Math.random() * 3);
    todos.push(execAsync({
        host: '127.0.0.1',
        port: port,
        username: 'foo',
        password: 'bar',
        readyTimeout: 99999
    }, command));
}

todos = todos.map(function (todo, i) {
    return todo.catch(function (err) {
        return console.warn('failed', i);
    })
});

q
    .all(todos)
    .then(function (res) {
        console.log(res.length);
        console.timeEnd('microBenchmark');
        return assert(CONNECTIONS_NO, res.length);
    })
    .catch(function (err) {
        return console.warn(err);
    })

console.log('Hey!.. nothing is blocked!');
