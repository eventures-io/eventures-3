'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($scope, scrollService, $element, $timeout, $stateParams, $document) {

    var aboutPosition;
    var contactPosition;

    $scope.activeSection = 'home';

    $scope.navigate = function (location) {
      scrollIntoView(location);
    }

    function scrollIntoView(section) {
      var selector = '.'.concat(section).concat('-section');
      debugger;
      var elPosition = scrollService.getElementTopPosition($element[0], selector);
      scrollService.scrollTo(elPosition);
    }

    function scrollHandler(){
      console.log('home scroll event');
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
    }

    $document.on('scroll', scrollHandler);

    function initPositions(){
        aboutPosition = scrollService.getElementTopPosition($element[0], '.about-section') - 30;
        contactPosition = scrollService.getElementTopPosition($element[0], '.contact-section') - 30;
    }

    function init() {
      if($stateParams.section.name){
        $timeout(function(){
        //  //todo jump to location
          $scope.navigate($stateParams.section.name);
        }, 100);
      }
    }

    init();

    $scope.$on("$destroy", function() {
      $document.off("scroll", scrollHandler);
    });

  });
