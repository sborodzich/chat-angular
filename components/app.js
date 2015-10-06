'use strict';

var ng = require('angular');

ng.module('exl-chat', [
    'ui.router',
    'angucomplete-alt'
])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/auth");

        $stateProvider
            .state('auth', {
                url: "/auth",
                templateUrl: "components/auth/views/auth.html",
                data: {
                    requireLogin: false
                }
            })
            .state('chat', {
                url: "/chat",
                templateUrl: "components/chat/views/chat.html",
                data: {
                    requireLogin: true
                }
            })
    }]).run(['$rootScope', '$state', 'authService', function ($rootScope, $state, authService) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var user = authService.isCurrentUserExists();

            if (toState.data.requireLogin && !user) {
                $state.go('auth');
                event.preventDefault();
            }

        })
    }]);

require('./auth/controllers/auth.js');
require('./chat/controllers/chat.js');
require('./common/services/server-values.js');
require('./common/services/server-change.js');
require('./common/services/local-storage.js');
require('./auth/services/auth.js');
require('./auth/services/user-factory.js');
require('./chat/services/autocomplete-dictionary-value.js');
require('./chat/services/chat.js');
require('./chat/services/message-factory.js');
require('./chat/services/utils-factory.js');
require('./chat/filters/highlight.js');
require('./chat/directives/message.js');
require('./chat/directives/possible-actions-menu.js');
require('./chat/directives/history-scroll.js');