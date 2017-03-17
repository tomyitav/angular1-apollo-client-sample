import angular from 'angular'
import ngRoute from 'angular-route'
import {CarsController} from './cars-controller'

export default angular
  .module('myApp.view1', [
    ngRoute
  ])
  .config(($routeProvider) => {
    $routeProvider.when('/cars', {
      templateUrl: 'cars/cars.html',
      controller: CarsController,
      controllerAs: '$ctrl'
    })
  })