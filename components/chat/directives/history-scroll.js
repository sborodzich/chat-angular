'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .directive('historyScroll', function scrollBottom() {
        return {
            scope: {
                messages: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('messages', function () {
                    $(element).animate({scrollTop: $(element)[0].scrollHeight}, 1000);
                })
            }
        };
    });