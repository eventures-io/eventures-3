'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($scope, scrollService, $document, $timeout, $stateParams) {

    var aboutPosition;
    var contactPosition;

    $scope.activeSection = 'home';


    $scope.navigate = function (location) {
      scrollIntoView(location);
    }

    function scrollIntoView(section) {
      var selector = '.'.concat(section).concat('-section');
      debugger;
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
      if($stateParams.section.name){
        $timeout(function(){
          $scope.navigate($stateParams.section.name);
        }, 100);

      }
    }

    init();


  });
