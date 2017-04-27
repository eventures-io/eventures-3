'use strict';
/**
 *
 */
angular
  .module('evtrs-site', [
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'evtrs-config',
    'evtrs-notes',
    'ngCookies'
    //'ngTouch'
  ]).config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

  $httpProvider.interceptors.push('HttpRequestInterceptor');
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);

  var hasBrowserSupport = function () {
    //var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    //    navigator.userAgent && !navigator.userAgent.match('CriOS');
    //
    //if (isSafari || !Modernizr.cssvwunit) { // jshint ignore:line
    //    return false;
    //}
    return true;
  };

  $urlRouterProvider
    .otherwise('/');
  if (hasBrowserSupport()) {
    $stateProvider
      .state('home', {
        url: '/',
        params: {
          section: {name: null}
        },
        views: {
          '': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            data: {
              title: 'Eventures'
            }
          },
          'about@home': {
            templateUrl: 'app/about/about.html',
            data: {
              title: 'Eventures: About'
            }
          },

          // for column two, we'll define a separate controller
          'contact@home': {
            templateUrl: 'app/contact/contact.html',
            data: {
              title: 'Eventures: Contact'
            }
          }
        }

      })
      .state('notes', {
        url: '/notes',
        templateUrl: 'app/notes/notes.html',
        controller: 'NotesController',
        data: {title: 'Eventures: Notes'}
      }).state('notes.post', {
        url: '/:postId/:postTitle',
        views: {
          post: {
            templateUrl: 'app/notes/post.html',
            controller: 'PostController'
          }
        }
      })
      .state('work', {
        url: '/work',
        templateUrl: 'app/work/work.html',
        controller: 'WorkController',
        data: {
          title: 'Eventures: Work'
        }
      })
      .state('work.project', {
        url: '/:project',
        views: {
          project: {
            templateUrl: function (stateParams) {
              var project;
              if (stateParams.project) {
                project = stateParams.project;
              } else {
                project = 'empty';
              }
              return 'app/work/projects/' + project + '/' + project + '.html';
            },
            controller: 'ProjectController'
          }
        }
      });
  } else {
    $stateProvider
      .state('browsehappy', {
        url: '/',
        templateUrl: 'app/home/browsehappy.html',
        controller: function ($rootScope) {
          $rootScope.$broadcast('HIDE_MENU_BTN');
        }
      });
  }


}).run(function ($http, $rootScope, $state, $window, $location) {

  $rootScope.$on('$stateChangeStart', function (event, to, params) {
    if (to.redirectTo) {
      event.preventDefault();
      $state.go(to.redirectTo, params);
    }
  });

  $rootScope.$on('$stateChangeSuccess', function (event, current) {
    $rootScope.$broadcast('LOCATION_CHANGE', current);
    //if (current.data) {
    //  $window.document.title = current.data.title;
    //}
  });


  //document.addEventListener('scroll', function () {
  //  if (ScrollService.scrolledToBottom()) {
  //    $rootScope.$broadcast('SCROLLED_TO_BOTTOM');
  //  }
  //});

}).filter('HtmlFilter', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}
]).filter('URLFilter', ['$sce', function ($sce) {
  return function (url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);

