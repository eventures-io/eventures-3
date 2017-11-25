'use strict';

angular.module('evtrs-site').directive('navMenu', function ($state, $timeout) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/nav-menu/nav-menu.html',
       link: function(scope, element) {
          transformicons.add('.tcon');
        },
        controller: function ($scope, $rootScope, $element) {
          $scope.isMenuOpen = false;

            $scope.toggleMenu = function () {
                $scope.isMenuOpen = !$scope.isMenuOpen;
                if($scope.isMenuOpen);

               //menu.classList.toggle('open');
            };

        }
    }

});
