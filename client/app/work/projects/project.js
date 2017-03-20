'use strict';

angular.module('evtrs-site')
  .controller('ProjectController', function ($scope, $stateParams, $document, $element, scrollService, PROJECT_CONSTANTS) {

    $scope.project = {}

    if ($stateParams.project === '') {
      $state.go('home');
    } else {
      $scope.project = PROJECT_CONSTANTS[$stateParams.project];
    }

    var summary = $element.find('.section-summary');
    var summaryTop = summary.position().top;
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

    $scope.scrollTo = function (section) {
      switch(section){
        case 'summary':
          scrollService.scrollTo(0);
          break;
        case 'ux':
          scrollService.scrollTo(uxTop);
          break;
        case 'dev':
          scrollService.scrollTo(devTop + 1);
          break;
        case 'design':
          scrollService.scrollTo(designTop);
          break;
      }

    }

    $document[0].onscroll = function () {
      var st = $(window).scrollTop();

      if (st + 5 >= summaryTop) {
        markSectionAsActive('summary');
      }
      if (projectContainsSection('ux')) {
        if (st >= uxTop) {
          ux.addClass('latched');
          markSectionAsActive('ux');
        } else {
          ux.removeClass('latched');
        }
      }
      if (projectContainsSection('dev')) {
        if (st >= devTop) {
          dev.addClass('latched');
          markSectionAsActive('dev');
        } else {
          dev.removeClass('latched');
        }
      }
      if (projectContainsSection('design')) {
        if (st + 1 >= designTop) {
          //design.addClass('latched');
          markSectionAsActive('design');
          $element.find('.footer-nav').addClass('visible');
        } else {
          $element.find('.footer-nav').removeClass('visible');
        }
      }
    };

    function markSectionAsActive(sectionId) {
      $element.find('[class*="section-link"]').removeClass('active');
      $element.find('.section-link-' + sectionId).addClass('active');
    }

    function projectContainsSection(sectionId) {
      return $scope.project.articleSections.find(function (section) {
          return section.id === sectionId;
        }) !== undefined;
    }


  });
