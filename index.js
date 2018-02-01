'use strict';

var rp = require('request-promise');
var assert = require('minimalistic-assert');
var fs = require('fs');

var Client = function (config) {
    assert(config.url);

    var baseUrl = config.url;
    var app = config.app || null;

    var send = function (uri, data) {
        var options = {
            method: 'POST',
            body: data,
            uri: uri,
            json: true
        };
        return rp(options);
    };

    var prepareData = (data) => {
        if (app) {
            var mergedOrigin = Object.assign({}, data.origin, {app: app});
            data['origin'] = mergedOrigin;
        }
        return data;
    }

    var log = function (key, data) {
        var pdata = prepareData(data);
        console.log('pdata', pdata);
        var uri = baseUrl + '/api/log/' + key;
        return send(uri, pdata);
    };

    var task = function (key, data) {
        var pdata = prepareData(data);
        console.log('pdata', pdata);
        var uri = baseUrl + '/api/task/' + key;
        return send(uri, data);
    };

    var file = function (filepath) {
        var url = baseUrl + '/api/file/';
        return rp({
            method: 'POST',
            url: url,
            formData: {
                file: fs.createReadStream(filepath)
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