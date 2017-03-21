'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($scope, $rootScope, $location, $state, scrollService, $document, $element, $timeout) {

    // TODO remove links from home, contact and about.
    //Call function instead, that changes location, then scrolls to section
    //Add scrollspy, change location according to section in view

    var homePosition;
    var aboutPosition;
    var contactPosition;
    var positionsInitiated = false;

    $scope.navigate = function(location){
      var stateName = location === 'home' ? location: 'home.'.concat(location);
      $state.go(stateName);
      scrollIntoView(location);
    }

    $document.on('scroll', function () {
      initPositions();
      var top = $document.scrollTop();
      if (top < aboutPosition.top) {
        $state.go('home');
      }
      if (top > aboutPosition.top && top < contactPosition.top) {
        $state.go('home.about');
      }
      if (top > contactPosition.top) {
        $state.go('home.contact');
      }
    });

    function setLocation(location) {
      if ($location.url() !== location) {
        $location.url(location);
      }
    }

    function scrollIntoView(section) {
      var selector = '.'.concat(section).concat('-section');
      var elPosition = scrollService.getElementTopPosition(selector);
      scrollService.scrollTo(elPosition);
    }

    function initPositions() {
      if (!positionsInitiated) {
        var home = $document.find('.home-section');
        homePosition = home.position();
        var about = $document.find('.about-section');
        aboutPosition = about.position();
        var contact = $document.find('.contact-section');
        contactPosition = contact.position();
        positionsInitiated = true;
      }
    }


    function init() {
        var location = $location.url();
        if (location !== '/') {
           $state.go('home');
        }
    }

    init();

  });
