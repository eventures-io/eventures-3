'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($window, $scope, $element, $timeout, $state) {

    $window.tiltFx.init();

    $scope.currentSlide = 1;
    $scope.slideCount = 4;
    var isTransitioning = false;
    var element = $element[0];
    var imgContainer = element.querySelector('.img-container');
    var contentContainer = element.querySelector('.content-container');
    var contentOverlay = element.querySelector('.content-overlay');
    var screenHeight = element.offsetHeight;

    var tll = new TimelineLite();
    var isScrolling = false;

    var transitionSlides = function (direction) {

      if (direction === 'down' && $scope.currentSlide < $scope.slideCount && !isTransitioning ) {
        $scope.currentSlide ++;
        doTransition('+=', '-=');

      } else if (direction === 'up' && $scope.currentSlide > 1 && !isTransitioning) {
        $scope.currentSlide --;
        doTransition('-=', '+=');
      }

    }

    var doTransition =  function(incrementOne, incrementTwo){
      isTransitioning = true;
      if($scope.currentSlide === 1 || $scope.currentSlide === 3 ) {
        contentOverlay.style.backgroundColor = "rgba(0,0,0, 0.4";
      }
      else if($scope.currentSlide === 4) {
        contentOverlay.style.backgroundColor = "rgba(0,0,0, 0.2";
      } else {
        contentOverlay.style.backgroundColor = "rgba(0,0,0, 0.3";
      }
      tll.to(imgContainer, 1.2, {y: incrementTwo.concat(screenHeight), ease: Power3.easeInOut})
      tll.to(contentContainer, .4, {css: {opacity: 0}, ease: Linear.easeIn}, "-=1.3")
      tll.to(contentContainer, 0.9, {y: incrementOne.concat(screenHeight), ease: Power2.easeInOut}, "-=1.2")
      tll.to(contentContainer, .8, {css: {opacity: 1}, ease: Linear.easeOut, onComplete: function(){
        isTransitioning = false;
      }}, "-=.8");

    }

    var wheelEventHandler = function (event) {

      if (!isScrolling) {

        $timeout(function () {

          if (event.deltaY > 2) {
           // console.log('scrolled down: ', event);
            transitionSlides('down');
          }

          if (event.deltaY < -2) {
            //console.log('scrolled up: ', event);
            transitionSlides('up');
          }

          isScrolling = false;
        }, 200);

        isScrolling = true;

      }

    }

    $scope.navigate = function (projectName) {

      tll.to(contentOverlay, .3, {css: {opacity: 0}, ease: Linear.easeOut});
      tll.to(contentContainer, .3, {css: {opacity: 0}, ease: Linear.easeOut}, "-=.3");

      $timeout(function(){
        $state.go('project', {project:projectName});
      }, 300);

    }

    $scope.navClickHandler = function (direction) {
      transitionSlides(direction);
    }


    $window.addWheelListener(element, wheelEventHandler);


  });
