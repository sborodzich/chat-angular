'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .controller('ChatController', ['$scope', 'authService', 'chatService', 'serverChangeService', 'wordsDictionary', 'utils', function ($scope, authService, chatService, serverChangeService, wordsDictionary, _) {
        var self = this;

        self.messagesHistory = chatService.getMessages();

        self.user = authService.currentUser();

        self.dictionary = wordsDictionary;

        self.serverValues = serverChangeService.getServerValues();

        self.setServerValues = function (newToken, newUrl) {
            serverChangeService.setServerValues(newToken, newUrl);
        };

        self.send = function (message, user, id) {
            if (message) {
                chatService.sendMessage(message, user, id);
            }

            $scope.$broadcast('angucomplete-alt:clearInput', 'dictionary');
        };

        self.autocompleteChanged = function (message) {
            self.messageText = message;
        };

        self.clearHistory = function () {
            chatService.clearMessagesHistory();
        };
    }]);