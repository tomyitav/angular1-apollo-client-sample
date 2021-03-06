import angular from 'angular'
import ngRoute from 'angular-route'
import angularUIRouter from 'angular-ui-router';
import cars from 'cars/cars'
import apolloCarServ from 'apollo/apollo-car-service-module'
import apolloTrainServ from 'apollo/apollo-train-service-module'
import trains from 'trains/train'
import version from 'components/version/version'

var myApp = angular
  .module('myApp', [
    ngRoute,
      angularUIRouter,
    version.name,
    cars.name,
      apolloCarServ.name,
      apolloTrainServ.name,
      trains.name,
  ])
  .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
    $locationProvider.hashPrefix('!')
      $urlRouterProvider.otherwise('/cars');
  })

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document.body, [myApp.name])
  })
