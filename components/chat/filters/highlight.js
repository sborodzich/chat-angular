'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .filter('highlighter', function ($sce) {

        return function (text, phrase) {
            if (phrase) {
                text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                    '<span class="exl-highlighted">$1</span>');
            }

            return $sce.trustAsHtml(text);
        }
    });