'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .factory('utils', function utilsFactory() {
        var wordsRegexPattern = /\w+/g;

        function words(text) {
            if (typeof text === 'string') {
                return text.match(wordsRegexPattern) || [];
            }

            return [];
        }

        function uniq(array) {
            var map = array.reduce(function (map, key) {
                map[key] = true;
                return map;
            }, {});

            return Object.keys(map);
        }

        function diff(base, diffArray) {
            var diffResult = [];

            for (var i = 0, length = base.length; i < length; i++) {
                if (!(~diffArray.indexOf(base[i]))) {
                    diffResult.push(base[i]);
                }
            }

            return diffResult;
        }

        function toFormat(arr) {
            return Array.isArray(arr) ? arr.map(function (value) {
                return {word: value};
            }) : [];
        }

        return {
            words: words,
            uniq: uniq,
            diff: diff,
            toFormat: toFormat
        };
    });