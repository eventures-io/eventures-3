'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($window, $scope, $element, $timeout) {

    $window.tiltFx.init();

    var element = $element[0];

    var imgContainer = element.querySelector('.img-container');
    var contentContainer = element.querySelector('.content-container');
    var screenHeight = element.offsetHeight;

    var tll = new TimelineLite();
    var isScrolling = false;

    var transition = function (direction) {
      var incrementOne;
      var incrementTwo;

      if (direction === 'down') {
        incrementOne = '+=';
        incrementTwo = '-=';
      } else if (direction === 'up') {
        incrementOne = '-=';
        incrementTwo = '+=';
      }

      tll.to(imgContainer, 1.5, {y: incrementTwo.concat(screenHeight), ease: Power3.easeInOut}, "+=.5")
      tll.to(contentContainer, .4, {css: {opacity: 0}, ease: Linear.easeIn}, "-=1.3")
      tll.to(contentContainer, 1.2, {y: incrementOne.concat(screenHeight), ease: Power2.easeInOut}, "-=1.5")
      tll.to(contentContainer, .8, {css: {opacity: 1}, ease: Linear.easeOut}, "-=.8");

    }

    var wheelEventHandler = function (event) {

      if (!isScrolling) {

        $timeout(function () {

          if (event.deltaY > 20) {
            console.log('scrolled down: ', event);
            transition('down');
          }

          if (event.deltaY < -20) {
            console.log('scrolled up: ', event);
            transition('up');
          }

          isScrolling = false;
        }, 200);

        isScrolling = true;

      }

    }

    $scope.navClickHandler = function (direction) {
        transition(direction);

    }

    $window.addWheelListener(element, wheelEventHandler);


  });
