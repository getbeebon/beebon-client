'use strict';

var rp = require('request-promise');
var assert = require('minimalistic-assert');
var fs = require('fs');

var Client = function (config) {
    assert(config.collection);

    var protocol = config.protocol || 'http';
    var host = config.host || 'localhost';
    var port = config.port || 3101;
    var collection = config.collection;

    //var uri = protocol + '://' + host + ':' + port + '/api/key/' + collection;

    var send = function (uri, data, tag = null) {

        var fullurl = tag ? uri + '/tag/' + tag : uri;
        var options = {
            method: 'POST',
            body: data,
            uri: fullurl,
            json: true // Automatically stringifies the body to JSON
        };
        return rp(options);
    };

    var log = function (data, tag) {
        var uri = protocol + '://' + host + ':' + port + '/api/log/' + collection;
        return send(uri, data, tag);
    };

    var task = function (data, tag) {
        var uri = protocol + '://' + host + ':' + port + '/api/task/' + collection;
        return send(uri, data, tag);
    };
    var file = function (filepath) {
        var url = protocol + '://' + host + ':' + port + '/api/file/';
        return rp({
            url: url,
            formData: {
                attachments: [fs.createReadStream(filepath)]
            }
        })
    };

    return {
        log: log,
        task: task,
        file: file
    };
};

module.exports = Client;