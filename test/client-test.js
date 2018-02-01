var assert = require('minimalistic-assert');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var Client = require('../');

describe('Beebon client', () => {
    var app = express();
    app.use(bodyParser.json());

    app.post('/api/log/email', (req, res) => {
        res.send(JSON.stringify(req.body));
    });

    app.post('/api/task/sms', (req, res) => {
        res.send(JSON.stringify(req.body))
    });

    var port = 3101;
    app.listen(port);

    var client = new Client({
        url: 'http://localhost:3101',
        app: 'qwqw'
    });

    it('log to server data', (done) => {
        client.log('email', {name: 'vasya', type: 'super'})
            .then((data) => {
                assert.equal('vasya', data.name);
                assert.equal('super', data.type);
                assert.equal('qwqw', data.origin.app);                
                done();
            });
    });

    it('task to server data', (done) => {
        client.task('sms', {name: 'vasya', type: 'super', origin: {tag: 'tag'}})
            .then((data) => {
                assert.equal('vasya', data.name);
                assert.equal('super', data.type);
                assert.equal('qwqw', data.origin.app);
                assert.equal('tag', data.origin.tag);
                done();
            });
    });

});