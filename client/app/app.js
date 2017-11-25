'use strict';
/**
 *
 */
angular
  .module('evtrs-site', [
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ngCookies'
    //'ngTouch'
  ]).config(function ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, PROJECT_CONSTANTS) {

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
          }
        }

      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
      })
      .state('project', {
        url: '/:project',
        templateUrl: function (stateParams) {
          var project;
          if (stateParams.project && projectExists(stateParams.project)) {
            project = stateParams.project;
          } else {
            console.error('project not found: ', stateParams)
          }
          return 'app/work/projects/' + project + '/' + project + '.html';
        },
        controller: 'ProjectController'
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


  function projectExists(projectId) {
    return typeof(PROJECT_CONSTANTS[projectId] !== 'undefined');
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

