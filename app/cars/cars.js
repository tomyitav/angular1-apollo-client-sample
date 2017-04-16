import angular from 'angular'
import angularUIRouter from 'angular-ui-router';
import {CarsController} from './cars-controller'

export default angular
  .module('myApp.view1', [
      angularUIRouter
  ])
  .config(($stateProvider) => {
      $stateProvider.state('cars', {
          url: '/cars',
          templateUrl: 'cars/cars.html',
          controller: CarsController,
          controllerAs: '$ctrl'
      })
  })