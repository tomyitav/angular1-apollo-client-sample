import angular from 'angular'
import ngRoute from 'angular-route'

import cars from 'cars/cars'
import view2 from 'view2/view2'
import version from 'components/version/version'
import ApolloWrapperService from 'apollo/apollo-wrapper-service'

var myApp = angular
  .module('myApp', [
    ngRoute,
    version.name,
    cars.name,
    view2.name,
      // ApolloWrapperService
  ])
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix('!')
    $routeProvider.otherwise({
      redirectTo: '/cars'
    })
  })
  .service('ApolloWrapperService', () => new ApolloWrapperService);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document.body, [myApp.name])
  })
