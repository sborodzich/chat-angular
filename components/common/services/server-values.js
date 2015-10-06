'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .value('serverValues', {
        startToken: 'TE11EN',
        serverUrl: 'http://localhost:999/chat'
    });