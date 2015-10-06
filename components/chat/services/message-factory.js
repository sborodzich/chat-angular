'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .factory('messageFactory', function () {

        function Message(text, user, id) {
            this.text = text;
            this.date = new Date().toISOString().slice(0, 10);
            this.user = user;
            this.id = id;
            this.isVisible = true;
        }

        Message.prototype.toString = function () {
            return JSON.stringify(this, ['text', 'user', 'id']);
        };

        function createMessage(text, user, id) {
            return new Message(text, user, id);
        }

        return {
            createMessage: createMessage
        };
    });