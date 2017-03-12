'use strict';

angular.module('evtrs-site')
  .controller('ProjectController', function ($scope, $stateParams, $document, $element, scrollService, PROJECT_CONSTANTS) {
    $scope.project = {}

    if ($stateParams.project === '') {
      $state.go('home');
    } else {
      debugger;
      $scope.project = PROJECT_CONSTANTS[$stateParams.project];
    }

    $scope.scrollTo = function (anchor) {
      scrollService.scrollTo(anchor);
    }

    //
    //var summary = $element.find('.section-summary');
    //var summaryTop =  summary.position().top;
    //$element.find('.spacer-summary').height(summary.height());

    if (projectContainsSection('ux')) {
      var ux = $element.find('.section-ux');
      var uxTop = ux.position().top;
      $element.find('.spacer-ux').height(ux.height());
    }

    if (projectContainsSection('dev')) {
      var dev = $element.find('.section-dev');
      var devTop = dev.position().top;
      $element.find('.spacer-dev').height(dev.height());
    }

    if (projectContainsSection('design')) {
      var design = $element.find('.section-design');
      var designTop = design.position().top;
      $element.find('.spacer-design').height(design.height());
    }

    $document[0].onscroll = function () {

      var st = $(window).scrollTop();

      //if (st >= summaryTop) {
      //  summary.addClass('latched');
      //} else {
      //  summary.removeClass('latched');
      //}
      if (projectContainsSection('ux')) {
        if (st >= uxTop) {
          ux.addClass('latched');
        } else {
          ux.removeClass('latched');
        }
      }
      if (projectContainsSection('dev')) {
        if (st >= devTop) {
          dev.addClass('latched');
        } else {
          dev.removeClass('latched');
        }
      }
      if (projectContainsSection('design')) {
        if (st >= designTop) {
          design.addClass('latched');
        } else {
          design.removeClass('latched');
        }
      }

    };

    function projectContainsSection(sectionId) {
      return $scope.project.articleSections.find(function (section) {
          return section.id === sectionId;
        }) !== undefined;
    }


  });
