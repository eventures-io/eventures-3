'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($scope, $rootScope, $location, $state, scrollService, $document, $element) {

    // TODO remove links from home, contact and about.
    //Call function instead, that changes location, then scrolls to section
    //Add scrollspy, change location according to section in view

    var homePosition;
    var aboutPosition;
    var contactPosition;

    $scope.$on('LOCATION_CHANGE', function (event, current) {
      if (current.url === 'about' || current.url === 'contact') {
        scrollIntoView(current.url);
      } else {
        scrollService.scrollTo(0);
      }
    });

    $document.on('scroll', function() {
      //console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
    });

    function scrollIntoView(section) {
      var selector = '.'.concat(section).concat('-section');
      var elPosition = scrollService.getElementTopPosition(selector);
      scrollService.scrollTo(elPosition);
    }


    function init(){
      var location = $location.$$url;
      //
      if (location.indexOf('about') !== -1) {
        scrollService.scrollTo(2000);
        //TODO: jump to exact location
      }
      else if (location.indexOf('contact') !== -1) {
        scrollService.scrollTo(4000);
        //TODO: jump to exact location
      }

      homePosition = $element.find('.section-section').position();


    }

    init();

  });
