'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .controller('AuthController', ['authService', function (authService) {
        var self = this;

        self.auth = function (userName) {
            if (userName) {
                authService.authorize(userName);
            }
        };

    }]);