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
      name: 'Polestar Emission Monitoring',
      articleSections : [
        {id:'ux', name: 'UX Design'},
        {id:'dev', name: 'Development'}
      ]
    },
    'bis': {
      id: 'bis',
      name: 'BIS',
      articleSections : [
        {id:'ux', name: 'Ux Design'},
        {id:'dev', name: 'Development'},
        //{id:'design', name: 'Interface Design'}
      ]
    }
  });
