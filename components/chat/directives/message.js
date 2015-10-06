'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .directive('messageItem', function () {
        return {
            restrict: 'EA',
            templateUrl: 'components/chat/templates/message.html',
            replace: true,
            scope: {
                message: '=',
                searchQuery: '='
            }
        };
    });