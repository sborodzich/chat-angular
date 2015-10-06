'use strict';

var ng = require('angular');

ng.module('exl-chat')
    .directive('possibleActionsMenu', ['chatService', function (chatService) {

        return {
            restrict: 'EA',
            templateUrl: 'components/chat/templates/possible-actions-menu.html',
            replace: true,
            scope: {
                message: '='
            },
            link: function (scope, element, attrs) {

                var quoteMessageButton = element.find('.exl-quote-message'),
                    hideAllMessagesButton = element.find('.exl-hide-all-user-messages');

                hideAllMessagesButton.on('click', function () {
                    scope.$apply(function () {
                        chatService.hideUserMessagesFromHistory(scope.message.user);
                    });
                });

                /*
                quoteMessageButton.on('click', function () {

                    console.log(scope.message, scope.messageText);

                    scope.$apply(function () {
                        scope.messageText = '\"' + 'Цитата: ' + scope.message.user + ' в ' + scope.message.date + ' написал: ' + scope.message.text;
                    });
                });

                scope.$on('$destroy', function () {
                    quoteMessageButton.off('click');
                });
                */
            }
        };
    }]);