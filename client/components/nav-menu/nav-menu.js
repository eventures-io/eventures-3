'use strict';

angular.module('evtrs-site').directive('navMenu', function ($state, $timeout) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'components/nav-menu/nav-menu.html',
    link: function () {
      transformicons.add('.tcon');
    },
    controller: function ($scope, $rootScope, $element) {
      $scope.isMenuOpen = false;
      var tcon = $element[0].querySelector('.tcon');

      $scope.toggleMenu = function () {
        $scope.isMenuOpen = !$scope.isMenuOpen;
      };

      $scope.navigate = function (state) {
        $state.go(state);
        $timeout(function(){
          transformicons.toggle(tcon);
          $scope.toggleMenu();
        }, 300)

      }
    }
  }

});
