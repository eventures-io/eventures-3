'use strict';

angular.module('evtrs-site')
  .controller('HomeController', function ($window, $scope, $element, $timeout) {

   $window.tiltFx.init();

   var isScrolling =  false;

   var wheelEventHandler = function(event){

     if (!isScrolling) {

       $timeout(function() {

         if(event.deltaY > 20){
           console.log('scrolled up: ' , event);
         }

         if(event.deltaY < -20){
           console.log('scrolled down: ' , event);
         }

         isScrolling = false;
       }, 200);

       isScrolling = true;

     };

   }

   var element = angular.element($element)[0];

   $window.addWheelListener(element, wheelEventHandler);


  });
