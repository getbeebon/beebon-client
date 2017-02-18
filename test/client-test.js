var assert = require('minimalistic-assert');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var Client = require('../');

describe('Beebon client', function () {
    var app = express();
    app.use(bodyParser.json());

    app.post('/api/key/main', function (req, res) {
        res.send(JSON.stringify(req.body));
    });

    app.post('/api/key/main/tag/init', function (req, res){
        req.body.tag = 'init';
        res.send(JSON.stringify(req.body))
    });

    var port = 3101;
    app.listen(port);

    var client = new Client({
        collection: 'main'
    });

    it('send to server data', function (done){
        client.send({name: 'vasya', type: 'super'})
            .then(function(data){
                assert.equal('vasya', data.name);
                assert.equal('super', data.type);
                done();
            });
    });

    it('send to server data with tag', function (done){
        client.send({name: 'vasya', type: 'super'}, 'init')
            .then(function(data){
                assert.equal('init', data.tag);
                done();
            });
    });
});