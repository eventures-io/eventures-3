'use strict';

angular.module('evtrs-site')
  .controller('ProjectController', function ($scope, $stateParams, $document, $element, scrollService, PROJECT_CONSTANTS) {

    $scope.project = {};
    var initialized = false;

    if ($stateParams.project === '') {
      $state.go('home');
    } else {
      $scope.project = PROJECT_CONSTANTS[$stateParams.project];
      scrollService.jumpTo(0);
    }

    var summary;
    var summaryTop;
    var ux;
    var uxTop;
    var dev;
    var devTop;
    var design;
    var designTop;

    $scope.scrollTo = function (section) {
      switch (section) {
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

    $document.on('scroll', scrollHandler);

    $element.find('.footer-nav').addClass('visible');

    function scrollHandler() {
      if (!initialized) {
        init();
        initialized = true;
      }
      var st = $document.scrollTop();
      if (st + 5 >= summaryTop) {
        // summary.addClass('latched');
        markSectionAsActive('summary');
      }
      if (projectContainsSection('ux')) {
        if (st >= uxTop) {
          //ux.addClass('latched');
          markSectionAsActive('ux');
        } else {
          // ux.removeClass('latched');
        }
      }
      if (projectContainsSection('dev')) {
        if (st >= devTop) {
          //dev.addClass('latched');
          markSectionAsActive('dev');
        } else {
          //dev.removeClass('latched');
        }
      }
      if (projectContainsSection('design')) {
        if (st + 1 >= designTop) {
          //design.addClass('latched');
          markSectionAsActive('design');
          //$element.find('.footer-nav').addClass('visible');
        } else {
          //$element.find('.footer-nav').removeClass('visible');
        }
      }
    }

    function initIterator() {
      var projects = Object.keys(PROJECT_CONSTANTS);
      var index = projects.indexOf($scope.project.id);
      var fwdIndex = index === projects.length - 1 ? 0 : index + 1;
      var bkwdIndex = index === 0 ? projects.length - 1 : index - 1;
      $scope.iterator = {next: 'work.project({ project: "' + projects[fwdIndex] + '"})' ,
        previous: 'work.project({ project: "' + projects[bkwdIndex] + '"})'};
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

    function init() {
      summary = $element.find('.section-summary');
      summaryTop = summary.position().top;

      if (projectContainsSection('ux')) {
        ux = $element.find('.section-ux');
        uxTop = ux.position().top;
      }

      if (projectContainsSection('dev')) {
        dev = $element.find('.section-dev');
        devTop = dev.position().top;
      }

      if (projectContainsSection('design')) {
        design = $element.find('.section-design');
        designTop = design.position().top;
      }

      initIterator();
    };

    init();

    $scope.$on('$destroy', function () {
      $document.off('scroll', scrollHandler);
    });


  });
