(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./auth/controllers/auth.js":2,"./auth/services/auth.js":3,"./auth/services/user-factory.js":4,"./chat/controllers/chat.js":5,"./chat/directives/history-scroll.js":6,"./chat/directives/message.js":7,"./chat/directives/possible-actions-menu.js":8,"./chat/filters/highlight.js":9,"./chat/services/autocomplete-dictionary-value.js":10,"./chat/services/chat.js":11,"./chat/services/message-factory.js":12,"./chat/services/utils-factory.js":13,"./common/services/local-storage.js":14,"./common/services/server-change.js":15,"./common/services/server-values.js":16}],2:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .controller('AuthController', ['authService', function (authService) {
        var self = this;

        self.auth = function (userName) {
            if (userName) {
                authService.authorize(userName);
            }
        };

    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .service('authService', ['userFactory', function (userFactory) {
        var user;

        this.authorize = function (name) {
            user = user || new userFactory.user(name);
        };

        this.currentUser = function () {
            return user;
        };

        this.isCurrentUserExists = function () {
            return !!user;
        };
    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .value('wordsDictionary', []);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .service('chatService', ['$http', 'serverValues', 'localStorageService', 'wordsDictionary', 'messageFactory', 'utils', function ($http, serverValues, localStorageService, wordsDictionary, messageFactory, _) {
        var messages = [],
            token = serverValues.startToken;

        this.sendMessage = function (message, user, id) {
            var newMessage = messageFactory.createMessage(message, user, id);

            $http.post(serverValues.serverUrl, newMessage.toString(), {
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            }).then(function () {
                var words = _.words(newMessage.text);
                var uniqueWords = _.uniq(words);
                uniqueWords = _.diff(uniqueWords, wordsDictionary);
                var formattedDictionary = _.toFormat(uniqueWords);

                messages.push(newMessage);
                wordsDictionary.push(formattedDictionary);
            }).catch(function (err) {
                console.error(err);
            });
        };

        this.getMessages = function () {

            $http.get(serverValues.serverUrl, {
                params: {
                    token: token
                }
            }).then(function (result) {
                var storedMessages = result.data.messages;
                token = result.data.token;
                storedMessages = storedMessages.map(function (msg) {
                    return messageFactory.createMessage(msg.text, msg.user, msg.id);
                });

                var words = _.words(storedMessages.reduce(function (text, message) {
                    return text + ' ' + message.text;
                }, ''));

                var uniqueWords = _.uniq(words);

                messages.push.apply(messages, storedMessages);
                wordsDictionary.push.apply(wordsDictionary, _.toFormat(uniqueWords));
            }).catch(function (err) {
                console.error(err);
            });

            return messages;
        };

        this.clearMessagesHistory = function () {
            messages.length = 0;
        };

        this.hideUserMessagesFromHistory = function (userName) {

            messages.forEach(function (message) {
                if (message.user === userName) {
                    message.isVisible = false;
                }
            });
        }

    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .service('localStorageService', [function () {
        var self = this,
            storage = localStorage;

        self.toFormat = function (array) {

        }
    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .service('serverChangeService', ['serverValues', function (serverValues) {
        var self = this;

        self.getServerValues = function () {
            return {
                serverToken: serverValues.startToken,
                serverUrl: serverValues.serverUrl
            }
        };

        self.setServerValues = function (newToken, newUrl) {
            serverValues.startToken = newToken;
            serverValues.serverUrl = newUrl
        };
    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('exl-chat')
    .value('serverValues', {
        startToken: 'TE11EN',
        serverUrl: 'http://localhost:999/chat'
    });
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
