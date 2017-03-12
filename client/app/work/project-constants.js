'use strict';

angular.module('evtrs-site')

  .constant('PROJECT_CONSTANTS', {
    'polestar': {
      id: 'polestar',
      name: 'Polestar',
      articleSections : [
        {id:'ux', name: 'UX Design'},
        {id:'dev', name: 'Development'},
        {id:'design', name: 'Interface Design'}
      ]
    },
    'bis': {
      id: 'bis',
      name: 'BIS',
      articleSections : [
        {id:'ux', name: 'Ux Design'},
        {id:'dev', name: 'Development'}
      ]
    }
  });
