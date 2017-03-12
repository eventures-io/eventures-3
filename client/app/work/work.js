'use strict';

angular.module('evtrs-site')
  .controller('WorkController', function ($scope, $rootScope, $state) {

    //TODO make work state abstract
    if ($state.current.name !== 'work.project') {
      $state.go('home');
    }


    $scope.getProjectIterator = function () {

      var projects = Object.keys(PROJECT_CONSTANTS);
      if ($scope.activeProject) {
        var index = projects.indexOf($scope.activeProject);

        var fwdIndex = index === projects.length - 1 ? 0 : index + 1;
        var bkwdIndex = index === 0 ? projects.length - 1 : index - 1;

        return {next: projects[fwdIndex], previous: projects[bkwdIndex]};
      } else {
        return {};
      }

    };

  });


