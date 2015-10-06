'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .service('authService', ['userFactory', function (userFactory) {
        var user;

        this.authorize = function (name) {
            user = user || new userFactory.user(name);
        };

        this.currentUser = function () {
            return user;
        };

        this.isCurrentUserExists = function () {
            return !!user;
        };
    }]);