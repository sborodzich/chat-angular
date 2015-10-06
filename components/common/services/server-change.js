'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .service('serverChangeService', ['serverValues', function (serverValues) {
        var self = this;

        self.getServerValues = function () {
            return {
                serverToken: serverValues.startToken,
                serverUrl: serverValues.serverUrl
            }
        };

        self.setServerValues = function (newToken, newUrl) {
            serverValues.startToken = newToken;
            serverValues.serverUrl = newUrl
        };
    }]);