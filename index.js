'use strict';

var rp = require('request-promise');
var assert = require('minimalistic-assert');

var Client = function (config) {
    assert(config.collection);

    var protocol = config.protocol || 'http';
    var host = config.host || 'localhost';
    var port = config.port || 3101;
    var collection = config.collection;

    var uri = protocol + '://' + host + ':' + port + '/api/key/' + collection;

    var send = function (data, tag = null) {

        var fullurl = tag ? uri + '/tag/' + tag : uri;
        var options = {
            method: 'POST',
            body: data,
            uri: fullurl,
            json: true // Automatically stringifies the body to JSON
        };
        return rp(options);
    };

    return {
        send: send
    };
};

module.exports = Client;