'use strict';

//TODO image(s) onload

angular.module('evtrs-site')
  .controller('ProjectController', function ($scope, $stateParams, $state, $document, $element, scrollService, PROJECT_CONSTANTS) {

    var summary, summaryTop, ux, uxTop, dev, devTop, design, designTop;
    var element = $element[0];


    $scope.project = {};
    var initialized = false;
    var tll = new TimelineLite();

    if ($stateParams.project === '' && typeof(PROJECT_CONSTANTS[$stateParams.project] == 'undefined')) {
      $state.go('home');
    } else {
      $scope.project = PROJECT_CONSTANTS[$stateParams.project];
      scrollService.jumpTo(0);
    }


    $scope.scrollTo = function (section) {
      init();
      switch (section) {
        case 'summary':
          scrollService.scrollTo(0);
          break;
        case 'ux':
          scrollService.scrollTo(uxTop + 2);
          break;
        case 'dev':
          scrollService.scrollTo(devTop + 2);
          break;
        case 'design':
          scrollService.scrollTo(designTop + 2);
          break;
      }

    }

    $document.on('scroll', scrollHandler);

    function scrollHandler() {
      if (!initialized) {
        init();
        initialized = true;
      }
      var st = $document.scrollTop();
      if (st + 5 >= summaryTop && st <= summaryTop + summary[0].offsetHeight) {
        // summary.addClass('latched');
        markSectionAsActive('summary');
        return;
      }
      if (projectContainsSection('dev')) {
        if (st >= devTop && st <= devTop + dev[0].offsetHeight) {
          //dev.addClass('latched');
          markSectionAsActive('dev');
          return;
        } else {
        }
      }
      if (projectContainsSection('ux')) {
        if (st >= uxTop && st <= uxTop + ux[0].offsetHeight) {
          //ux.addClass('latched');
          markSectionAsActive('ux');
          return;
        } else {
          // ux.removeClass('latched');
        }
      }
      if (projectContainsSection('design')) {
        if (st + 1 >= designTop) {
          //design.addClass('latched');
          markSectionAsActive('design');
          return;
        } else {
        }
      }
    }

    function initIterator() {
      var projects = Object.keys(PROJECT_CONSTANTS);
      var index = projects.indexOf($scope.project.id);
      var fwdIndex = index === projects.length - 1 ? 0 : index + 1;
      var bkwdIndex = index === 0 ? projects.length - 1 : index - 1;
      $scope.iterator = {
        next: {
          sref: 'project({ project: "' + projects[fwdIndex] + '"})',
          name: PROJECT_CONSTANTS[projects[fwdIndex]].name
        },
        previous: {
          sref: 'project({ project: "' + projects[bkwdIndex] + '"})',
          name: PROJECT_CONSTANTS[projects[bkwdIndex]].name
        }
      };
    };


    function markSectionAsActive(sectionId) {
      console.log('mark as active: ' + sectionId);
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

    };


    $scope.$on('$destroy', function () {
      $document.off('scroll', scrollHandler);
    });


    angular.element(document).ready(function () {
      //console.log('page loading completed');
      var sideNav = document.querySelector('.side-nav');
      var footerNav = document.querySelector('.footer-nav');
      tll.to(sideNav, .4, {css: {opacity: '1'}, ease: Linear.easeIn})
      tll.to(footerNav, .4, {css: {opacity: '1'}, ease: Linear.easeIn});
    });

    var animate = function () {
      var bgMask = element.querySelector('.bg-mask');
      var projectHeader = element.querySelector('.project-header');
      var summaryHeader = element.querySelector('.summary-header');

      tll.to(projectHeader, .6, {css: {width: '100vw', height: '100vh', margin: '0'}, ease: Power4.easeOut}, "+=.6")
     //TODO add hidden parameter to indicate cycling
     // tll.to(projectHeader, 0, {css: {width: '100vw', height: '100vh', margin: '0'}})
      tll.to(projectHeader, .9, {css: {height: '40vh', backgroundPosition: 'bottom'}, ease: Power4.easeOut}, "-=.3")
      tll.to(bgMask, 0, {css: {top: '40vh'}})
      tll.to(summaryHeader, .6, {css: {top: '-15vh'}, ease: Power4.easeOut}, "-=.7")
      //console.log('animation  completed');
    }

    initIterator();
    animate();


  });
