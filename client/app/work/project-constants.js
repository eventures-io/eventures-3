'use strict';

angular.module('evtrs-site')

  .constant('PROJECT_CONSTANTS', {
    'weather+': {
      id: 'weather+',
      name: 'Weather+',
      articleSections : [
        {id:'ux', name: 'UX Design'},
        {id:'dev', name: 'Development'},
        {id:'design', name: 'UI Design'}
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
      name: 'BIS Stats Tool',
      articleSections : [
        {id:'dev', name: 'Development'},
        {id:'ux', name: 'Ux Design'},
        {id:'design', name: 'UI Design'}
      ]
    },
    'turnip': {
      id: 'turnip',
      name: 'Turnip',
      articleSections : [
        //{id:'ux', name: 'UX Design'},
        {id:'dev', name: 'Development'},
        //{id:'design', name: 'UI Design'}
      ]
    },
  });
