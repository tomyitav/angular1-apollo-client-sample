import angular from 'angular'
import ngRoute from 'angular-route'

import cars from 'cars/cars'
import view2 from 'view2/view2'
import version from 'components/version/version'

var myApp = angular
  .module('myApp', [
    ngRoute,
    version.name,
    cars.name,
    view2.name
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
