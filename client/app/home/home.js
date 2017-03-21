'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($scope, scrollService, $document, $timeout) {

    var aboutPosition;
    var contactPosition;
    var initiated = false;

    $scope.activeSection = 'home';

    $scope.navigate = function (location) {
      scrollIntoView(location);
    }

    function scrollIntoView(section) {
      var selector = '.'.concat(section).concat('-section');
      var elPosition = scrollService.getElementTopPosition(selector);
      scrollService.scrollTo(elPosition);
    }

    $document.on('scroll', function () {
      initPositions();
      var top = $document.scrollTop();
      if (top < aboutPosition && $scope.activeSection !== 'home') {
        $scope.activeSection = 'home';
        $scope.$apply();
      }
      if (top > aboutPosition && top < contactPosition && $scope.activeSection !== 'about') {
        $scope.activeSection = 'about';
        $scope.$apply();
      }
      if (top > contactPosition && $scope.activeSection !== 'contact') {
        $scope.activeSection = 'contact';
        $scope.$apply();
      }
    });

    function initPositions(){
        aboutPosition = scrollService.getElementTopPosition('.about-section') - 30;
        contactPosition = scrollService.getElementTopPosition('.contact-section') - 30;
    }

    function init() {
        $timeout(function(){
          initPositions();
        }, 300);
    }

  });
