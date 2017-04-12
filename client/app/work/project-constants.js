'use strict';

angular.module('evtrs-site')

  .constant('PROJECT_CONSTANTS', {
    'weather+': {
      id: 'weather+',
      name: 'Weather+',
      articleSections : [
        {id:'ux', name: 'UX Design'},
        {id:'dev', name: 'Development'},
        {id:'design', name: 'Interface Design'}
      ]
    },
    'pem': {
      id: 'pem',
      name: 'Emission Monitoring',
      articleSections : [
        {id:'dev', name: 'Development'},
        {id:'ux', name: 'UX Design'}

      ]
    },
    'bis': {
      id: 'bis',
      name: 'BIS',
      articleSections : [
        {id:'dev', name: 'Development'},
        {id:'ux', name: 'Ux Design'},
        {id:'design', name: 'Interface Design'}
      ]
    }
  });
