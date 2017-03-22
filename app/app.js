import angular from 'angular'
import ngRoute from 'angular-route'

import cars from 'cars/cars'
import apolloServ from 'apollo/apollo-wrapper-service-module'
import view2 from 'view2/view2'
import version from 'components/version/version'
import ApolloWrapperService from 'apollo/apollo-wrapper-service'

var myApp = angular
  .module('myApp', [
    ngRoute,
    version.name,
    cars.name,
      apolloServ.name,
    view2.name,
  ])
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix('!')
    $routeProvider.otherwise({
      redirectTo: '/cars'
    })
  })

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document.body, [myApp.name])
  })
