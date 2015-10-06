'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .factory('userFactory', function () {

        function User(name) {
            this.name = name;
            this.id = (Math.round(Math.random() * (new Date))).toString();
        }

        return {
            user: User
        };
    });