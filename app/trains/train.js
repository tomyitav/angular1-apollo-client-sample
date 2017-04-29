import angular from 'angular'
import angularUIRouter from 'angular-ui-router';
import {TrainController} from './train-controller'

export default angular
  .module('myApp.train', [
      angularUIRouter
  ])
  .config(($stateProvider) => {
      $stateProvider.state('trains', {
        url: '/trains',
        templateUrl: 'trains/trains.html',
        controller: TrainController,
        controllerAs: '$ctrl'
    })
  })
