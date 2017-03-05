'use strict';

angular.module('evtrs-site')
  .controller('ProjectController', function ($scope, $stateParams, $document, $element) {
    if ($stateParams.project === '') {
      $state.go('home');
    }

    //var intro = $element.find('.section-intro');
    //var introTop =  intro.position().top;
    //$element.find('.spacer-intro').height(intro.height());


    var ux = $element.find('.section-ux');
    var uxTop =  ux.position().top;
    $element.find('.spacer-ux').height(ux.height());

    var dev = $element.find('.section-dev');
    var devTop =  dev.position().top;
    $element.find('.spacer-dev').height(dev.height());

    var design = $element.find('.section-design');
    var designTop =  design.position().top;
    $element.find('.spacer-design').height(design.height());


    $document[0].onscroll = function () {

      var st = $(window).scrollTop();

      console.log("scrolling: " + st);

      //if (st >= introTop) {
      //  intro.addClass('latched');
      //} else {
      //  intro.removeClass('latched');
      //}
      if (st >= uxTop) {
        ux.addClass('latched');
      } else {
        ux.removeClass('latched');
      }

      if (st >= devTop) {
        dev.addClass('latched');
      } else {
        dev.removeClass('latched');
      }
      if (st >= designTop) {
        design.addClass('latched');
      } else {
        design.removeClass('latched');
      }

    };


  });
