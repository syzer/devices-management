/**
 * Created by syzer on 5/14/2015.
 */
var fs = require('fs'),
    crypto = require('crypto');

var buffersEqual = require('buffer-equal-constant-time'),
    ssh2 = require('ssh2'),
    utils = ssh2.utils,
    Server = ssh2.Server;

var pubKey = utils.genPublicKey(utils.parseKey(fs.readFileSync('key.rsa.pub')));

var server = new Server({
    privateKey: fs.readFileSync('key.rsa')
}, function(client) {
    //console.log('Client connected!');

    client.on('authentication', function(ctx) {
        if (ctx.method === 'password'
            && ctx.username === 'foo'
            && ctx.password === 'bar') {
            ctx.accept();
        } else {
            ctx.reject();
        }
    }).on('ready', function() {
        //console.log('Client authenticated!');

        client.on('session', function(accept, reject) {
            var session = accept();
            session.once('exec', function(accept, reject, info) {
                //console.log('Client wants to execute: ', info.command);
                var stream = accept();
                //stream.stderr.write('Oh no, the dreaded errors!\n');
                stream.write(info.command);
                stream.exit(0);
                stream.end();
            });
        });
    }).on('end', function() {
        //console.log('Client disconnected');
    }).on('error', function(err) {
        //console.log(err)
    });
});

module.exports = server;
