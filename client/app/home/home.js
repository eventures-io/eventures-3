'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($scope, scrollService, $element, $timeout, $stateParams, $document) {

    var aboutPosition;
    var contactPosition;
    var lastFromTop = 0;

    $scope.activeSection = 'home';
    $scope.isScrollUp = false;

    $scope.navigate = function (location) {
       scrollIntoView(location);
    }

    function scrollIntoView(section) {
      var selector = '.'.concat(section).concat('-section');
      var elPosition = scrollService.getElementTopPosition($element[0], selector);
      scrollService.scrollTo(elPosition);
    }

    function jumpToView(section) {
      var selector = '.'.concat(section).concat('-section');
      var elPosition = scrollService.getElementTopPosition($element[0], selector);
      scrollService.jumpTo(elPosition);
    }

    function scrollHandler(){
      initPositions();
      var fromTop = $document.scrollTop();
      var scrollDirection = lastFromTop - fromTop < 0 ? 'up' : 'down';
      lastFromTop = fromTop;

      if(scrollDirection === 'down'){
        $scope.isScrollUp = false;
      } else {
        $scope.isScrollUp = true;
      }

      if (fromTop < (aboutPosition -1)  && $scope.activeSection !== 'home') {
        $scope.activeSection = 'home';
        $scope.$apply();
      }
      if (fromTop > (aboutPosition -1) && fromTop < (contactPosition-1) && $scope.activeSection !== 'about') {
        $scope.activeSection = 'about';
        $scope.$apply();
      }
      if (fromTop > (contactPosition -1) && $scope.activeSection !== 'contact') {
        $scope.activeSection = 'contact';
        $scope.$apply();
      }
    }

    $document.on('scroll', scrollHandler);

    function initPositions(){
        aboutPosition = scrollService.getElementTopPosition($element[0], '.about-section');
        contactPosition = scrollService.getElementTopPosition($element[0], '.contact-section');
    }

    function init() {
      if($stateParams.section.name){
        $timeout(function(){
        //  //todo jump to location
          jumpToView($stateParams.section.name);
        }, 100);
      }
    }

    init();

    $scope.$on("$destroy", function() {
      $document.off("scroll", scrollHandler);
    });

  });
